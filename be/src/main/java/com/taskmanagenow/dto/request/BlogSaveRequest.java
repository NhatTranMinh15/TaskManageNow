package com.taskmanagenow.dto.request;

import java.util.UUID;
import lombok.Data;

@Data
public class BlogSaveRequest {
    UUID id;
    String title;
    String preview;
    UUID[] categories;
    String content;
//    String thumbnail;
}
