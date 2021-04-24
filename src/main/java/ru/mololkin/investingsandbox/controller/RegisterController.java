package ru.mololkin.investingsandbox.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.mapper.UserEntityMapper;
import ru.mololkin.investingsandbox.service.UserService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class RegisterController {
    private final UserService userService;
    private final UserEntityMapper userEntityMapper;

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody UserDto user) {
        UserEntity newUser = userEntityMapper.map(user);

        UserEntity registered = userService.register(newUser);
        return ResponseEntity.ok(userEntityMapper.map(registered));
    }

}
