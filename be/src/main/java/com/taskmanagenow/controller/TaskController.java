package com.taskmanagenow.controller;

import com.taskmanagenow.dto.request.TaskGetRequest;
import com.taskmanagenow.dto.request.TaskSaveRequest;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.dto.response.TaskResponse;
import com.taskmanagenow.service.TaskService;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.AllArgsConstructor;
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
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/tasks")
public class TaskController {

    private final TaskService service;

    @GetMapping()
    public ResponseEntity getAll(@Valid TaskGetRequest request, Pageable pagable, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        PageResponse result = service.getAll(request, pagable, authentication);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity getOne(@PathVariable("id") UUID id, Authentication authentication) {
        TaskResponse result = service.getOne(id, authentication);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public ResponseEntity createOne(@Valid @RequestBody TaskSaveRequest taskSaveRequest, Authentication authentication) {
        TaskResponse result = service.saveOne(taskSaveRequest, authentication);
        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateOne(@PathVariable("id") UUID id, @Valid @RequestBody TaskSaveRequest taskSaveRequest, Authentication authentication) {
        TaskResponse result = service.updateOne(id, taskSaveRequest, authentication);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteOne(@PathVariable("id") UUID id, Authentication authentication) {
        service.deleteOne(id, authentication);
        return ResponseEntity.noContent().build();
    }
}
