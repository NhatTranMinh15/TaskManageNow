package com.taskmanagenow.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CommentResponse {
    UUID id;
    String content;
    UUID createdBy;
    LocalDateTime createdAt;
    UUID updatedBy;
    LocalDateTime updatedAt;
}
