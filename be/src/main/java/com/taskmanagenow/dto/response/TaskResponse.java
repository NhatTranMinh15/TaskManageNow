package com.taskmanagenow.dto.response;

import com.taskmanagenow.util.constant.Priority;
import com.taskmanagenow.util.constant.Status;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TaskResponse {

    private UUID id;
    private String summary;
    private String description;
    private Status status;
    private Priority priority;
    private UUID assignee;
    private LocalDateTime dueDate;
    private LocalDateTime createdAt;
    private String timeTracking;
//    private String comments;
//    private Set<Task> subTasks;
}
