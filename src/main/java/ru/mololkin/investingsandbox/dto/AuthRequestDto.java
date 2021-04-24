package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequestDto {
    @NotNull(message = "email mustn't be null")
    private String email;
    @NotNull(message = "password mustn't be null")
    private String password;
}
