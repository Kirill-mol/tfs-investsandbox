package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponseDto {
    private String email;
    private String token;
}
