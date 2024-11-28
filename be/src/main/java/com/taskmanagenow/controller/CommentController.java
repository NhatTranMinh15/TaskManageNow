package com.taskmanagenow.controller;

import com.taskmanagenow.dto.response.CommentResponse;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.service.CommentService;
import com.taskmanagenow.dto.request.CommentSaveRequest;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@AllArgsConstructor
@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    CommentService service;

    @GetMapping("/task/{task_id}")
    public ResponseEntity getAllCommentOfTask(@PathVariable("task_id") UUID taskId, Pageable pageable, Authentication authentication) {
        PageResponse<CommentResponse> result = service.getAllOfTask(taskId, pageable, authentication);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public ResponseEntity createOne(@Valid @RequestBody CommentSaveRequest commentSaveRequest, Authentication authentication) {
        CommentResponse result = service.saveOne(commentSaveRequest, authentication);
        return ResponseEntity.ok().body(result);
    }

//    @GetMapping("/user")
//    public ResponseEntity getAllMyComment(Pageable pageable, Authentication authentication) {
//        PageResponse result = service.getAllOfUser(pageable, authentication);
//        return ResponseEntity.ok().body(result);
//    }
//    @GetMapping("/user/{user_id}")
//    public ResponseEntity getAllCommentOfUser(@PathVariable("user_id") UUID userId, Pageable pageable, Authentication authentication) {
//        PageResponse result = service.getAllOfUser(userId, pageable, authentication);
//        return ResponseEntity.ok().body(result);
//    }
}
