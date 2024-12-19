package com.taskmanagenow.dto.response;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CategoryResponse {

    UUID id;
    String name;
    String value;
}
