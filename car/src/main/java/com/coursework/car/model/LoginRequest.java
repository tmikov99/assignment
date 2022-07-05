package com.coursework.car.model;

import com.coursework.car.validation.ValidEmail;
import com.coursework.car.validation.ValidPassword;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class LoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
