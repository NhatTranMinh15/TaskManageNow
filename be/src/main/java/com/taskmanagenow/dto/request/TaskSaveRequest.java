package com.taskmanagenow.dto.request;

import com.taskmanagenow.util.constant.Priority;
import com.taskmanagenow.util.constant.Status;
import jakarta.validation.constraints.NotEmpty;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TaskSaveRequest {

    private UUID id;

    @NotEmpty(message = "Summary must not be empty")
    private String summary;

    private String description = "";

    private Status status = Status.OPEN;

    private Priority priority = Priority.MEDIUM;

    private UUID assignee;

    private LocalDateTime dueDate;

//    private String comments;
//    private Set<Task> subTasks;
    private String timeTracking;

    public void setDescription(String description) {
        if (description != null) {
            this.description = description;
        }
    }

    public void setStatus(Status status) {
        if (status != null) {
            this.status = status;
        }
    }

    public void setPriority(Priority priority) {
        if (priority != null) {
            this.priority = priority;
        }
    }

}
