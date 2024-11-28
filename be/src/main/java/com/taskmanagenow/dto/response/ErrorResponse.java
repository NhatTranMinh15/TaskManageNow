package com.taskmanagenow.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class ErrorResponse {
    String message;
    HttpStatus status;

    public ErrorResponse(String message) {
        this.message = message;
    }
    
}
