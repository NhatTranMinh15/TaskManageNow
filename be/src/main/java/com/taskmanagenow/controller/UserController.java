package com.taskmanagenow.controller;

import com.taskmanagenow.service.UserService;
import com.taskmanagenow.dto.request.UserSaveRequest;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.dto.response.UserResponse;
import java.util.UUID;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
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
    UserService service;

    @GetMapping("")
    public ResponseEntity getAll(@RequestParam("param") String param, Pageable pageable) {
        PageResponse<UserResponse> users = service.getAll(param, pageable);
        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable("id") UUID id) {
        UserRepresentation users = service.getOne(id);
        return ResponseEntity.ok().body(users);
    }

    @PostMapping("/keycloak")
    public ResponseEntity createOneFromKeycloak(@RequestBody UserSaveRequest user) {
        service.saveOne(user);
        return ResponseEntity.ok().body("Save user successfully");
    }

    @PutMapping("/keycloak")
    public ResponseEntity updateOneFromKeycloak(@RequestBody UserSaveRequest user) {
        service.updateOne(user);
        return ResponseEntity.ok().body("Update user successfully");
    }

    @DeleteMapping("/keycloak/{id}")
    public ResponseEntity deleteOneFromKeycloak(@PathVariable("id") String id) {
        service.deleteOne(UUID.fromString(id));
        return ResponseEntity.noContent().build();
    }
}
