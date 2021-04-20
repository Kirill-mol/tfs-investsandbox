package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class AuthRequestDto {
    private String email;
    private String password;
}
