package com.tmn.taskmanagenow.service;

import com.tmn.taskmanagenow.config.KeycloakClientConfig;
import com.tmn.taskmanagenow.dto.request.UserSaveRequest;
import com.tmn.taskmanagenow.dto.response.PageResponse;
import com.tmn.taskmanagenow.dto.response.UserResponse;
import com.tmn.taskmanagenow.mapper.UserMapper;
import com.tmn.taskmanagenow.model.KeycloakConfigProperties;
import com.tmn.taskmanagenow.model.User;
import com.tmn.taskmanagenow.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.event.EventListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    ApplicationContext context = new AnnotationConfigApplicationContext(KeycloakClientConfig.class);
    UserRepository repository;
    UserMapper mapper;
    private final KeycloakConfigProperties keycloakPropsConfig;
    private static final int USER_PER_PAGE = 15;
    private Keycloak keycloak = (Keycloak) context.getBean("keycloak");

    public PageResponse getAllLocal(Pageable pagable, Authentication authentication) {
        Page<User> result = repository.findAll(pagable);
        return new PageResponse(mapper.ToResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }

    public List<UserRepresentation> getAll(int pageNo, Authentication authentication) {
        List<UserRepresentation> response = keycloak.realm(keycloakPropsConfig.getRealm()).users().search(null, pageNo * USER_PER_PAGE, USER_PER_PAGE);
        return response;
    }

    public Optional<User> getOne(UUID userId, Authentication authentication) {
        UserRepresentation response = keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId.toString()).toRepresentation();
        return Optional.ofNullable(mapper.fromRepresentation(response));
    }

    public UserResponse saveOne(UserSaveRequest userSaveRequest) {
        User user = mapper.toEntity(userSaveRequest);
        repository.save(user);
        return mapper.ToResponse(user);
    }

    @Transactional(rollbackOn = RuntimeException.class)
    public UserResponse updateOne(UserSaveRequest userSaveRequest) {
        User user = repository.findById(UUID.fromString(userSaveRequest.getId())).orElse(new User(UUID.fromString(userSaveRequest.getId())));
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

    @EventListener
    public void appReady(ApplicationReadyEvent event) {

    }
}
