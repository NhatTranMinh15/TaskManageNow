package com.tmn.taskmanagenow.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    String id;
    String username;
    String email;
    String firstName;
    String lastName;
}
