package com.taskmanagenow.service;

import com.taskmanagenow.config.KeycloakClientConfig;
import com.taskmanagenow.config.KeycloakConfigProperties;
import com.taskmanagenow.dto.request.UserSaveRequest;
import com.taskmanagenow.dto.response.UserResponse;
import com.taskmanagenow.exception.ResourceNotFoundException;
import com.taskmanagenow.mapper.UserMapper;
import com.taskmanagenow.model.User;
import com.taskmanagenow.repository.UserRepository;
import com.taskmanagenow.dto.response.PageResponse;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    UserRepository repository;
    UserMapper mapper;
    ApplicationContext context = new AnnotationConfigApplicationContext(KeycloakClientConfig.class);
    private final KeycloakConfigProperties keycloakPropsConfig;
    private Keycloak keycloak = (Keycloak) context.getBean("keycloak");

    public PageResponse<UserResponse> getAll(String param, Pageable pageable) {
        PageRequest pageRequest = (PageRequest) pageable;
        int count = keycloak.realm(keycloakPropsConfig.getRealm()).users().count(param);
        List<UserRepresentation> response = keycloak
                .realm(keycloakPropsConfig.getRealm())
                .users()
                .search(param, pageRequest.getPageNumber() * pageRequest.getPageSize(), pageRequest.getPageSize());
        return new PageResponse(
                mapper.toResponseListFromRepresentationList(response),
                pageRequest.getPageNumber(),
                (count / pageRequest.getPageSize()) + 1,
                (long) count
        );
    }

    public UserRepresentation getOne(UUID userId) {
        UserRepresentation response = keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId.toString()).toRepresentation();
        if (response == null) {
            throw new ResourceNotFoundException("User does not exist!");
        }
        return response;
    }

    public UserResponse saveOne(UserSaveRequest userSaveRequest) {
        User user = mapper.toEntity(userSaveRequest);
        repository.save(user);
        return mapper.toResponse(user);
    }

    @Transactional(rollbackOn = RuntimeException.class)
    public UserResponse updateOne(UserSaveRequest userSaveRequest) {
        User user = repository.findById(UUID.fromString(userSaveRequest.getId()))
                .orElse(new User(UUID.fromString(userSaveRequest.getId())));
        user = mapper.updateProperties(userSaveRequest, user);
        repository.save(user);
        return mapper.toResponse(user);
    }

    public void deleteOne(UUID id) {
        User user = repository.getReferenceById(id);
        if (user != null) {
            repository.delete(user);
        }
    }
}
