package com.taskmanagenow.service;

import com.taskmanagenow.dto.response.CommentResponse;
import com.taskmanagenow.mapper.CommentMapper;
import com.taskmanagenow.model.Comment;
import com.taskmanagenow.model.Task;
import com.taskmanagenow.repository.CommentRepository;
import com.taskmanagenow.repository.TaskRepository;
import com.taskmanagenow.dto.request.CommentSaveRequest;
import com.taskmanagenow.service.interfaces.CommentServiceInterface;
import com.taskmanagenow.dto.response.PageResponse;
import jakarta.persistence.EntityNotFoundException;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CommentService implements CommentServiceInterface{

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
        UserRepresentation user = userService.getOne(userId);
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
