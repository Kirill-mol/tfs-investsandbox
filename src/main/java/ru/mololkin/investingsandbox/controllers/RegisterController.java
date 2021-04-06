package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.UserService;

@RestController
@RequestMapping("/api/v1/")
@RequiredArgsConstructor
public class RegisterController {
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserEntity user) {
        UserEntity newUser = UserEntity.builder()
                .password(user.getPassword())
                .email(user.getEmail())
                .username(user.getUsername())
                .build();

        UserEntity registered = userService.register(newUser);
        return ResponseEntity.ok(new UserDto(registered));
    }

}
