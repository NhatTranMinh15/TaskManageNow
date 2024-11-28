package com.taskmanagenow.service;

import com.taskmanagenow.config.KeycloakClientConfig;
import com.taskmanagenow.config.KeycloakConfigProperties;
import com.taskmanagenow.dto.request.UserSaveRequest;
import com.taskmanagenow.dto.response.UserResponse;
import com.taskmanagenow.mapper.UserMapper;
import com.taskmanagenow.model.User;
import com.taskmanagenow.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    UserRepository repository;
    UserMapper mapper;
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

    public UserResponse saveOne(UserSaveRequest userSaveRequest) {
        User user = mapper.toEntity(userSaveRequest);
        repository.save(user);
        return mapper.ToResponse(user);
    }

    @Transactional(rollbackOn = RuntimeException.class)
    public UserResponse updateOne(UserSaveRequest userSaveRequest) {
        User user = repository.findById(UUID.fromString(userSaveRequest.getId()))
                .orElse(new User(UUID.fromString(userSaveRequest.getId())));
        user = mapper.updateProperties(userSaveRequest, user);
        repository.save(user);
        return mapper.ToResponse(user);
    }

    public void deleteOne(UUID id) {
        User user = repository.getReferenceById(id);
        if (user != null) {
            repository.delete(user);
        }
    }
}
