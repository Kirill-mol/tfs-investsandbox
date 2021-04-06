package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.repos.UserRepository;

import java.util.Collections;
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

}

