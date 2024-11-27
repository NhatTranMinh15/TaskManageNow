package com.tmn.taskmanagenow.service;

import com.tmn.taskmanagenow.dto.request.CommentSaveRequest;
import com.tmn.taskmanagenow.dto.response.CommentResponse;
import com.tmn.taskmanagenow.dto.response.PageResponse;
import com.tmn.taskmanagenow.mapper.CommentMapper;
import com.tmn.taskmanagenow.model.Comment;
import com.tmn.taskmanagenow.model.Task;
import com.tmn.taskmanagenow.model.User;
import com.tmn.taskmanagenow.repository.CommentRepository;
import com.tmn.taskmanagenow.repository.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CommentService {
    
    CommentRepository repository;
    CommentMapper mapper;
    TaskRepository taskRepository;
    UserService userService;
    
    public PageResponse getAllOfTask(UUID taskId, Pageable pageable, Authentication authentication) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new EntityNotFoundException("Task not exist"));
        Page<Comment> result = repository.findAllByTaskId(taskId, pageable);
        return new PageResponse(mapper.ToResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }
    
    public PageResponse getAllOfUser(Pageable pageable, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();
        return getAllOfUser(UUID.fromString(jwt.getSubject()), pageable, authentication);
    }
    
    public PageResponse getAllOfUser(UUID userId, Pageable pageable, Authentication authentication) {
        User user = userService.getOne(userId, authentication).orElseThrow(() -> new EntityNotFoundException("User not found"));
        Page<Comment> result = repository.findAllByUserId(userId, pageable);
        return new PageResponse(mapper.ToResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }
    
    public CommentResponse saveOne(CommentSaveRequest commentSaveRequest, Authentication authentication) {
        Task task = taskRepository.findById(commentSaveRequest.getTaskId()).orElseThrow(() -> new EntityNotFoundException("Task not exist"));
        Comment comment = mapper.toEntity(commentSaveRequest);
        comment.setTask(task);
        comment = repository.save(comment);
        return mapper.ToResponse(comment);
    }
    
}
