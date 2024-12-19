package com.taskmanagenow.dto.query;

import com.taskmanagenow.model.composite.BlogCategory;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface BlogPreviewDTO {

    UUID getId();

    String getTitle();

    String getSlug();

    List<BlogCategory> getCategories();

    String getThumbnail();

    String getThumbnailAlt();

    String getPreview();

    int getViews();

    UUID getCreatedBy();

    LocalDateTime getCreatedAt();
}
