package com.taskmanagenow.dto.request;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class UserSaveRequest {

    @Nullable
    String id;
    String username;
    String email;
    String firstName;
    String lastName;
}
