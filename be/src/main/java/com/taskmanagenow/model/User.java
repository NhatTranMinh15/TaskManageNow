package com.taskmanagenow.model;

import jakarta.persistence.Entity;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "users")
public class User extends BaseModel {

    private String username;
    private String email;
    private String firstName;
    private String lastName;

    public User(UUID id) {
        super(id);
    }
    public User(UUID id, String username, String email, String firstName, String lastName) {
        super(id);
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    @Override
    public String toString() {
        return "User{" + "id=" + id + ", username=" + username + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName + '}';
    }
}
