package com.taskmanagenow.config;

import static org.keycloak.OAuth2Constants.PASSWORD;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(KeycloakConfigProperties.class)
public class KeycloakClientConfig {

    private final KeycloakConfigProperties keycloakPropsConfig;

    public KeycloakClientConfig(KeycloakConfigProperties keycloakPropsConfig) {
        this.keycloakPropsConfig = keycloakPropsConfig;
    }

    @Bean()
    public Keycloak keycloak() {
        return KeycloakBuilder.builder()
                .serverUrl("http://localhost:8080")
                .realm("TaskManageNow")
                .clientId("taskmanagenow")
                .grantType(PASSWORD)
                .username("admin")
                .password("admin")
                .clientSecret("hZnEarrFgriBAeCLneyZQX4mjyVj5eY4")
                .build();
    }
//    @Bean
//    public Keycloak keycloak() {
//        return KeycloakBuilder.builder()
//                .serverUrl(keycloakPropsConfig.getAuthServerUrl())
//                .realm(keycloakPropsConfig.getRealm())
//                .clientId(keycloakPropsConfig.getResource())
//                .grantType(PASSWORD)
//                .username("admin")
//                .password("123456")
//                .clientSecret(keycloakPropsConfig.getCredentials().getSecret())
//                .build();
//    }
}
