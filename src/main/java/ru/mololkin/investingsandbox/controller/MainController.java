package ru.mololkin.investingsandbox.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.mapper.UserEntityMapper;
import ru.mololkin.investingsandbox.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final UserRepository userRepository;
    private final UserEntityMapper userEntityMapper;

    @GetMapping("/")
    public String hello() {
        return "Welcome to my investing sandbox REST-API";
    }

}

