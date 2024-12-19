package com.taskmanagenow.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BlogResponse {

    UUID id;
    String title;
    String slug;
    List<CategoryResponse> categories;
    String thumbnail;
    String thumbnailAlt;
    String preview;
    String content;
    int views;
    UUID authorId;
    LocalDateTime createdAt;
}
