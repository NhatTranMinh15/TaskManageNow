package com.tmn.taskmanagenow.model;

import com.tmn.taskmanagenow.util.constant.Priority;
import com.tmn.taskmanagenow.util.constant.Status;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Task extends BaseModel {

    private String summary;

    private String description;

    private Status status;

    private Priority priority;

    private UUID assignee;

    private LocalDateTime dueDate;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

//    private Set<Task> subTasks;
//    private Task parentTask;
    private String timeTracking;

    public Task(UUID id) {
        super(id);
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setTask(this);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setTask(null);
    }
}
