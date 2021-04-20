package ru.mololkin.investingsandbox.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entities.Currency;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.mappers.UserEntityMapper;
import ru.mololkin.investingsandbox.repos.UserRepository;
import ru.mololkin.investingsandbox.utils.CurrencyExchanger;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final UserRepository userRepository;
    private final UserEntityMapper userEntityMapper;
    private final CurrencyExchanger currencyExchanger;

    @GetMapping("/test")
    public List<UserDto> testFindAll() {
        List<UserEntity> all = userRepository.findAll();
        return all.stream().map(userEntityMapper::map).collect(Collectors.toList());
    }

    @GetMapping("/")
    public String hello() throws JsonProcessingException {
        double exchange = currencyExchanger.exchange(Currency.EUR, Currency.RUB, 1000.0);
        return Double.toString(exchange);
    }

}

