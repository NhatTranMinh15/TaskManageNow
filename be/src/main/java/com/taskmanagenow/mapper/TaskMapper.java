package com.taskmanagenow.mapper;

import com.taskmanagenow.dto.request.TaskSaveRequest;
import com.taskmanagenow.dto.response.TaskResponse;
import com.taskmanagenow.model.Task;
import org.springframework.stereotype.Service;

@Service
public class TaskMapper implements BaseMapper<Task, TaskSaveRequest, TaskResponse> {

    @Override
    public Task toEntity(TaskSaveRequest request) {
        Task task = new Task();
        if (task.getId() != null) {
            task.setId(request.getId());
        }
        updateProperties(request, task);
        return task;
    }

    @Override
    public TaskResponse ToResponse(Task entity) {
        return new TaskResponse(
                entity.getId(),
                entity.getSummary(),
                entity.getDescription(),
                entity.getStatus(),
                entity.getPriority(),
                entity.getAssignee(),
                entity.getDueDate(),
                entity.getCreatedAt(),
                entity.getTimeTracking());
    }

    @Override
    public Task transferPropertiesFrom(Task oldEntity, Task newEntity) {
        if (oldEntity == null || newEntity == null) {
            return null;
        }
        newEntity.setSummary(oldEntity.getSummary());
        newEntity.setDescription(oldEntity.getDescription());
        newEntity.setStatus(oldEntity.getStatus());
        newEntity.setPriority(oldEntity.getPriority());
        newEntity.setAssignee(oldEntity.getAssignee());
        newEntity.setDueDate(oldEntity.getDueDate());
        newEntity.setTimeTracking(oldEntity.getTimeTracking());
        return newEntity;
    }

    @Override
    public Task updateProperties(TaskSaveRequest request, Task entity) {
        if (!request.getSummary().isEmpty()) {
            entity.setSummary(request.getSummary());
        }
        if (request.getDescription() != null) {
            entity.setDescription(request.getDescription());
        }
        if (request.getStatus() != null) {
            entity.setStatus(request.getStatus());
        }
        if (request.getPriority() != null) {
            entity.setPriority(request.getPriority());
        }
        if (request.getAssignee() != null) {
            entity.setAssignee(request.getAssignee());
        }
        return entity;
    }

}
