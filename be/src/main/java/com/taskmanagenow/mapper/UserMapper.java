package com.taskmanagenow.mapper;

import com.taskmanagenow.dto.request.UserSaveRequest;
import com.taskmanagenow.dto.response.UserResponse;
import com.taskmanagenow.model.User;
import java.util.UUID;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;

@Service

public class UserMapper implements BaseMapper<User, UserSaveRequest, UserResponse> {

    @Override
    public User toEntity(UserSaveRequest request) {
        User user = new User();
        if (request.getId() != null) {
            user.setId(UUID.fromString(request.getId()));
        }
        user = updateProperties(request, user);
        return user;
    }

    @Override
    public UserResponse ToResponse(User entity) {
        return new UserResponse(
                entity.getId().toString(),
                entity.getEmail(),
                entity.getUsername(),
                entity.getFirstName(),
                entity.getLastName()
        );
    }

    @Override
    public User transferPropertiesFrom(User oldEntity, User newEntity) {
        if (newEntity == null) {
            newEntity = new User();
        }
        if (oldEntity == null) {
            return new User();
        }
        newEntity.setEmail(oldEntity.getEmail());
        newEntity.setUsername(oldEntity.getUsername());
        newEntity.setFirstName(oldEntity.getFirstName());
        newEntity.setLastName(oldEntity.getLastName());
        return newEntity;
    }

    @Override
    public User updateProperties(UserSaveRequest request, User entity) {
        if (!request.getEmail().isEmpty()) {
            entity.setEmail(request.getEmail());
        }
        if (!request.getUsername().isEmpty()) {
            entity.setUsername(request.getUsername());
        }
        if (!request.getFirstName().isEmpty()) {
            entity.setFirstName(request.getFirstName());
        }
        if (!request.getLastName().isEmpty()) {
            entity.setLastName(request.getLastName());
        }
        return entity;
    }

    public User fromRepresentation(UserRepresentation representation) {
        if (representation == null) {
            return null;
        }
        return new User(UUID.fromString(representation.getId()), representation.getUsername(), representation.getEmail(), representation.getFirstName(), representation.getLastName());
    }
}
