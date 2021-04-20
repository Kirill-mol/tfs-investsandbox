package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.mappers.UserEntityMapper;
import ru.mololkin.investingsandbox.service.UserService;

@RestController
@RequiredArgsConstructor
public class RegisterController {
    private final UserService userService;
    private final UserEntityMapper userEntityMapper;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto user) {
        UserEntity newUser = userEntityMapper.map(user);

        UserEntity registered = userService.register(newUser);
        return ResponseEntity.ok(userEntityMapper.map(registered));
    }

}
