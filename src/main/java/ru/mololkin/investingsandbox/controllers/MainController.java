package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.repos.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final UserRepository userRepository;

    @GetMapping("/test")
    public List<UserDto> testFindAll() {
        List<UserEntity> all = userRepository.findAll();
        return all.stream().map(UserDto::new).collect(Collectors.toList());
    }

    @GetMapping("/")
    public String hello() {
        return "Welcome to my app!";
    }

}

