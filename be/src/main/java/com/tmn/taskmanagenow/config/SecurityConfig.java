package com.tmn.taskmanagenow.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    public static final String ADMIN = "taskmanagenow_client_admin";
    public static final String USER = "taskmanagenow_client_user";
    private final JwtConverter jwtConverter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((req) -> req
                .requestMatchers("/actuator/*").hasRole(ADMIN)
                .requestMatchers("/api/v1/admin/*").hasRole(ADMIN)
                .anyRequest().authenticated());
        // remove csrf state in session because in jwt do not need them
        http.csrf((t) -> t.disable());
        http.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtConverter)));

        return http.build();
    }
}
