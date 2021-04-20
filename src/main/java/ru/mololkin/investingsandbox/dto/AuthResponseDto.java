package ru.mololkin.investingsandbox.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AuthResponseDto {
    private String email;
    private String token;
    private Long expiration;
}
