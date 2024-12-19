package com.taskmanagenow.controller;

import com.taskmanagenow.dto.request.BlogGetRequest;
import com.taskmanagenow.dto.request.BlogSaveRequest;
import com.taskmanagenow.dto.request.CommentSaveRequest;
import com.taskmanagenow.dto.response.BlogResponse;
import com.taskmanagenow.dto.response.CommentResponse;
import com.taskmanagenow.service.BlogService;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.service.BlogCommentService;
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
@RequestMapping("/api/v1/blogs")
public class BlogController {

    private final BlogService service;
    private final BlogCommentService commentService;

    @GetMapping("/previews")
    public ResponseEntity getAllPreviews(@Valid BlogGetRequest request, Pageable pageable, Authentication authentication) {
        PageResponse result = service.getAllPreviews(request, pageable, authentication);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/admin")
    public ResponseEntity getAll(@Valid BlogGetRequest request, Pageable pageable, Authentication authentication) {
        PageResponse result = service.getAll(request, pageable, authentication);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/{slug}")
    public ResponseEntity getBySlug(@PathVariable("slug") String slug) {
        BlogResponse result = service.getBySlug(slug);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping
    public ResponseEntity createOne(@Valid @RequestBody BlogSaveRequest request, Authentication authentication) {
        BlogResponse result = service.saveOne(request, authentication);
        return ResponseEntity.ok().body(result);
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity getAllCommentOfBlog(@PathVariable("id") UUID id, Pageable pageable, Authentication authentication) {
        PageResponse result = commentService.getAllCommentOfBlog(id, pageable, authentication);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping("/comments/{id}")
    public ResponseEntity createCommentOfBlog(@PathVariable("id") UUID id, @Valid @RequestBody CommentSaveRequest request, Authentication authentication) {
        CommentResponse result = commentService.createCommentOfBlog(id, request, authentication);
        return ResponseEntity.ok().body(result);
    }

}
