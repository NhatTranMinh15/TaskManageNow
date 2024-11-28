package com.taskmanagenow.service;

import com.taskmanagenow.config.KeycloakClientConfig;
import com.taskmanagenow.config.KeycloakConfigProperties;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    ApplicationContext context = new AnnotationConfigApplicationContext(KeycloakClientConfig.class);
    private final KeycloakConfigProperties keycloakPropsConfig;
    private static final int USER_PER_PAGE = 15;
    private Keycloak keycloak = (Keycloak) context.getBean("keycloak");

    public List<UserRepresentation> getAll(int pageNo, Authentication authentication) {
        List<UserRepresentation> response = keycloak.realm(keycloakPropsConfig.getRealm()).users().search(null, pageNo * USER_PER_PAGE, USER_PER_PAGE);
        return response;
    }

    public Optional<UserRepresentation> getOne(UUID userId, Authentication authentication) {
        UserRepresentation response = keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId.toString()).toRepresentation();
        return Optional.ofNullable(response);
    }
}
