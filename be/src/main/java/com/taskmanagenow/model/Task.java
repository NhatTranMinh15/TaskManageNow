package com.taskmanagenow.model;

import com.taskmanagenow.model.abtract.BaseModel;
import com.taskmanagenow.util.constant.Priority;
import com.taskmanagenow.util.constant.Status;
import jakarta.persistence.Entity;
import java.time.LocalDateTime;
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

//    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<Comment> comments = new ArrayList<>();

//    private Set<Task> subTasks;
//    private Task parentTask;
    private String timeTracking;

    public Task(UUID id) {
        super(id);
    }

//    public void addComment(Comment comment) {
//        comments.add(comment);
//        comment.setTask(this);
//    }
//
//    public void removeComment(Comment comment) {
//        comments.remove(comment);
//        comment.setTask(null);
//    }
}
