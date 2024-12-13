package com.taskmanagenow.service;

import com.taskmanagenow.dto.request.TaskGetRequest;
import com.taskmanagenow.dto.request.TaskSaveRequest;
import com.taskmanagenow.model.Task;
import com.taskmanagenow.repository.TaskRepository;
import com.taskmanagenow.service.interfaces.TaskServiceInterface;
import com.taskmanagenow.dto.response.PageResponse;
import com.taskmanagenow.dto.response.TaskResponse;
import com.taskmanagenow.exception.ResourceNotFoundException;
import com.taskmanagenow.mapper.TaskMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class TaskService implements TaskServiceInterface {

    private final TaskRepository repository;
    private final TaskMapper mapper;

    public PageResponse getAll(TaskGetRequest request, Pageable pageable, Authentication authentication) {
        //        TODO: Specification
        PageRequest pageRequest = (PageRequest) pageable;
        Page<Task> result = repository.findAll(pageRequest);
        return new PageResponse(mapper.ToResponseList(result.getContent()), result.getNumber(), result.getTotalPages(), result.getTotalElements());
    }

    public TaskResponse getOne(UUID id, Authentication authentication) {
        Task result = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task does not exist!"));
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
