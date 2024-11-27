package com.tmn.taskmanagenow.model;

import com.tmn.taskmanagenow.util.constant.General;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class AuditListener {

    @PrePersist
    public <E extends BaseModel> void setCreatedBy(E e) {
        if (e != null) {
            UserAndId userAndId = getUserAndId();
            e.setCreatedBy(userAndId.id);
//            e.setCreatedUser(userAndId.user);
            e.setCreatedAt(LocalDateTime.now());
        }
    }

    @PreUpdate
    public <E extends BaseModel> void setUpdatedBy(E e) {
        if (e != null) {
            UserAndId userAndId = getUserAndId();
            e.setUpdatedBy(userAndId.id);
//            e.setUpdatedUser(userAndId.user);
            e.setUpdatedAt(LocalDateTime.now());
        }
    }

    private UserAndId getUserAndId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UUID uuid;
        String username = "";
        try {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            uuid = UUID.fromString(jwt.getSubject());
            username = jwt.getClaim("preferred_username");
        } catch (ClassCastException ex) {
            uuid = General.minUUID;
        }
        User user = new User(uuid);
        user.setUsername(username);
        return new UserAndId(user, uuid);
    }

    @AllArgsConstructor
    private class UserAndId {

        protected User user;
        protected UUID id;
    }
}
