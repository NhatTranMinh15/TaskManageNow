package com.taskmanagenow.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(KeycloakConfigProperties.class)
public class KeycloakClientConfig {

}
