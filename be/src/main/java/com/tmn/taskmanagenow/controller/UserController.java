package com.tmn.taskmanagenow.controller;

import com.tmn.taskmanagenow.dto.request.UserSaveRequest;
import com.tmn.taskmanagenow.dto.response.PageResponse;
import com.tmn.taskmanagenow.service.UserService;
import java.util.List;
import java.util.UUID;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping()
    public ResponseEntity getAll(@RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo, Authentication authentication) {
        List<UserRepresentation> users = service.getAll(pageNo, authentication);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/local")
    public ResponseEntity getAllLocal(Pageable pagable, Authentication authentication) {
        PageResponse response = service.getAllLocal(pagable, authentication);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/keycloak")
    public ResponseEntity createOneFromKeycloak(@RequestBody UserSaveRequest user) {
        service.saveOne(user);
        return ResponseEntity.ok().body("Save user successfully");
    }

    @PutMapping("/keycloak")
    public ResponseEntity updateOneFromKeycloak(@RequestBody UserSaveRequest user, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();

        service.updateOne(user);
        return ResponseEntity.ok().body("Update user successfully");
    }

    @DeleteMapping("/keycloak/{id}")
    public ResponseEntity deleteOneFromKeycloak(@PathVariable("id") String id) {
        service.deleteOne(UUID.fromString(id));
        return ResponseEntity.noContent().build();
    }

}
