package com.tmn.taskmanagenow.model;

import jakarta.persistence.Entity;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "`user`")
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

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + "username=" + username + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName + '}';
    }

}
