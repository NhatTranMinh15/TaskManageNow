package com.tmn.user_event_listener;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.Builder;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;
import org.keycloak.events.Event;
import org.keycloak.events.EventListenerProvider;
import org.keycloak.events.EventType;
import org.keycloak.events.admin.AdminEvent;
import org.keycloak.events.admin.ResourceType;
import org.keycloak.models.KeycloakContext;
import org.keycloak.models.KeycloakSession;

public class UserEventListenerProvider implements EventListenerProvider {

    protected static final HttpClient client = HttpClient.newHttpClient();
    protected static final String uri = "http://host.docker.internal:15000/api/v1/users/keycloak";
    protected final KeycloakSession session;

    public UserEventListenerProvider(KeycloakSession session) {
        this.session = session;
    }

    @Override
    public void onEvent(Event event) {
        if (event.getType() == EventType.REGISTER) {
//            RealmModel realm = session.realms().getRealm(event.getRealmId());
//            UserModel user = session.users().getUserById(realm, event.getUserId());
//            String body = toJSON(user);
//            HttpRequest request = HttpRequest.newBuilder()
//                    .uri(URI.create(uri))
//                    .POST(HttpRequest.BodyPublishers.ofString(body))
//                    .setHeader("Content-Type", "application/json")
//                    .build();
//            CompletableFuture<HttpResponse<String>> futureResponse = CLIENT.sendAsync(request, HttpResponse.BodyHandlers.ofString());
//            Thread.ofVirtual().start(() -> {
//                try {
//                    System.out.println("Waiting Response");
//                    HttpResponse<String> response = futureResponse.get();
//                    System.out.print(response.statusCode() + " ");
//                    System.out.println(response.body());
//                } catch (InterruptedException | ExecutionException ex) {
//                    System.out.println("Waiting For Response Failed");
//                }
//            });
        }
        System.out.println("User event: "
                + " By: " + event.getUserId()
                + " Type: " + event.getType());
    }

    @Override
    public void onEvent(AdminEvent event, boolean includeRepresentation) {
        outer:
        if (event.getResourceType() == ResourceType.USER) {
            Builder builder = HttpRequest.newBuilder().uri(URI.create(uri));
            String body = event.getRepresentation();
            String userId = event.getResourcePath().split("/")[1];
            switch (event.getOperationType()) {
                case CREATE -> {
                    StringBuilder sb = new StringBuilder("{\"id\":\"");
                    sb.append(userId).append("\",");
                    sb.append(body.substring(1));
                    builder = builder.POST(HttpRequest.BodyPublishers.ofString(sb.toString()));
                }
                case UPDATE -> {
                    builder = builder.PUT(HttpRequest.BodyPublishers.ofString(event.getRepresentation()));
                }
                case DELETE -> {
                    builder = builder.DELETE().uri(URI.create(uri + "/" + userId));
                }
                case ACTION -> {
                    break outer;
                }
            }
            Token accessToken = getAccessToken();
            if (accessToken != null) {
                builder = builder.setHeader("Authorization", "Bearer " + accessToken.getAccess_token());
                HttpRequest request = builder.setHeader("Content-Type", "application/json").build();
                client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
                logout(accessToken.getId_token());
            }
        }

        System.out.println("Admin event:"
                + " By: " + event.getAuthDetails().getUserId()
                + " Resource Type: " + event.getResourceType()
                + " Operation Type: " + event.getOperationType());
    }

    @Override
    public void close() {
    }

    ObjectMapper mapper = new ObjectMapper();

    private Token getAccessToken() {
        String baseLocalUrl = getLocalUrl();
        String url = baseLocalUrl + "/protocol/openid-connect/token";
        URI localUri = URI.create(url);
        HttpRequest request = HttpRequest.newBuilder()
                .POST(HttpRequest.BodyPublishers.ofString(toTokenBodyJSON()))
                .uri(localUri)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .build();
        Token token = null;
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                token = new Token();
                JsonNode jsonNode = mapper.readTree(response.body());
                token.setAccess_token(jsonNode.get("access_token").asText());
                token.setId_token(jsonNode.get("id_token").asText());
                token.setExpires_in(jsonNode.get("expires_in").asInt());
            }
        } catch (IOException | InterruptedException ex) {
        }
        return token;
    }

    public void logout(String id_token_hint) {
        if (id_token_hint == null) {
            return;
        }
        String baseLocalUrl = getLocalUrl();
        String url = baseLocalUrl + "/protocol/openid-connect/logout" + "?id_token_hint=" + id_token_hint;
        URI localUri = URI.create(url);
        HttpRequest request = HttpRequest.newBuilder().GET().uri(localUri).build();
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString());
    }

    public String toTokenBodyJSON() {
        Map<String, String> parameters = new HashMap<>();
        parameters.put("grant_type", "password");
        parameters.put("client_id", "taskmanagenow");
        parameters.put("username", "internal_admin");
        parameters.put("password", "internaladmin");
        parameters.put("client_secret", "hZnEarrFgriBAeCLneyZQX4mjyVj5eY4");
        parameters.put("scope", "openid");
        String form = parameters.entrySet()
                .stream()
                .map(e -> e.getKey() + "=" + URLEncoder.encode(e.getValue(), StandardCharsets.UTF_8))
                .collect(Collectors.joining("&"));
        return form;
    }

    public String getLocalUrl() {
        String localAddress = session.getContext().getConnection().getLocalAddr();
        int localPort = session.getContext().getConnection().getLocalPort();
        String realmName = session.getContext().getRealm().getName();
        String baseLocalUrl = "http://" + localAddress + ":" + localPort + "/realms/" + realmName;
//        return baseLocalUrl;
        return "http://localhost:" + localPort + "/realms/" + realmName;
    }
}

//    login page
// http://localhost:8080/realms/TaskManageNow/protocol/openid-connect/auth?client_id=taskmanagenow&response_type=code
