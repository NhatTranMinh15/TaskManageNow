package com.tmn.taskmanagenow.mapper;

import com.tmn.taskmanagenow.dto.request.TaskSaveRequest;
import com.tmn.taskmanagenow.dto.response.TaskResponse;
import com.tmn.taskmanagenow.model.Task;
import org.springframework.stereotype.Service;

@Service
public class TaskMapper implements BaseMapper<Task, TaskSaveRequest, TaskResponse> {

    @Override
    public Task toEntity(TaskSaveRequest dto) {
        Task task = new Task();
        if (task.getId() != null) {
            task.setId(dto.getId());
        }
        updateProperties(dto, task);
        return task;
    }

    @Override
    public TaskResponse ToResponse(Task e) {
        return new TaskResponse(
                e.getId(),
                e.getSummary(),
                e.getDescription(),
                e.getStatus(),
                e.getPriority(),
                e.getAssignee(),
                e.getDueDate(),
                e.getTimeTracking());
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
        return entity;
    }

}
