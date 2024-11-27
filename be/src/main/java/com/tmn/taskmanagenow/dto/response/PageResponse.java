package com.tmn.taskmanagenow.dto.response;

import java.util.List;

public record PageResponse<T>(
        List<T> content, 
        Integer currentPage, 
        Integer totalPage, 
        Long totalElements) {

}
