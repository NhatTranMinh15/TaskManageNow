package com.tmn.taskmanagenow.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CommentResponse {
    UUID commentId;
    UUID taskId;
    String content;
    UUID createdBy;
//    String username;
    LocalDateTime createdAt;
    UUID updatedBy;
    LocalDateTime updatedAt;
}
