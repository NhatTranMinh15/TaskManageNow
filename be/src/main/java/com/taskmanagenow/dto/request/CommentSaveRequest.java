package com.taskmanagenow.dto.request;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.Data;

@Data
public class CommentSaveRequest {
    private UUID id;
    @NotNull(message = "Comment must not be null")
    private String content;
    private UUID parentId;
}
