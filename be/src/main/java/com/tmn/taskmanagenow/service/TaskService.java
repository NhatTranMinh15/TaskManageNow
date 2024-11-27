package com.tmn.taskmanagenow.service;

import com.tmn.taskmanagenow.dto.request.TaskGetRequest;
import com.tmn.taskmanagenow.dto.request.TaskSaveRequest;
import com.tmn.taskmanagenow.dto.response.PageResponse;
import com.tmn.taskmanagenow.dto.response.TaskResponse;
import com.tmn.taskmanagenow.exception.ResourceNotFoundException;
import com.tmn.taskmanagenow.mapper.TaskMapper;
import com.tmn.taskmanagenow.model.Task;
import com.tmn.taskmanagenow.repository.TaskRepository;
import com.tmn.taskmanagenow.service.interfaces.TaskServiceInterface;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TaskService implements TaskServiceInterface {

    private final TaskRepository repository;
    private final TaskMapper mapper;

    public PageResponse getAll(TaskGetRequest request, Pageable pagable, Authentication authentication) {
        Jwt jwt = (Jwt) authentication.getPrincipal();

//        TODO: Specification
        Page<Task> result = repository.findAll(pagable);
        return new PageResponse(mapper.ToResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }

    public TaskResponse getOne(UUID id, Authentication authentication) {
        Task result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task does not exists!"));
        return mapper.ToResponse(result);
    }

    public TaskResponse saveOne(TaskSaveRequest taskSaveRequest, Authentication authentication) {
        Task task = mapper.toEntity(taskSaveRequest);
        repository.save(task);
        return mapper.ToResponse(task);
    }

    @Transactional
    public TaskResponse updateOne(UUID id, TaskSaveRequest taskSaveRequest, Authentication authentication) {
        Task task = repository.getReferenceById(id);
        task = mapper.updateProperties(taskSaveRequest, task);
        repository.save(task);
        return mapper.ToResponse(task);
    }

    public void deleteOne(UUID id, Authentication authentication) {
        Task task = repository.getReferenceById(id);
        if (task != null) {
            repository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Task does not exists!");
        }

    }
}
