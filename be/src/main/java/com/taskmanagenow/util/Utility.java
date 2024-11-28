package com.taskmanagenow.util;

import com.taskmanagenow.util.constant.General;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class Utility {

    public static Jwt getToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return jwt;
    }

    public static UUID getUserId() {
        try {
            Jwt jwt = getToken();
            UUID uuid = UUID.fromString(jwt.getSubject());
            return uuid;
        } catch (ClassCastException ex) {
            return General.minUUID;
        }
    }
}
