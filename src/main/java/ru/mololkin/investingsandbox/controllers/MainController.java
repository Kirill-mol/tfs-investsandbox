package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.entities.dto.UserDto;
import ru.mololkin.investingsandbox.repos.UserRepository;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
public class MainController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<UserDto> testingController() {
        PortfolioUnitEntity portfolioUnit = PortfolioUnitEntity.builder()
                .name("Apple")
                .ticker("AAPL")
                .quantity(2)
                .build();

        StockPortfolioEntity stockPortfolio = StockPortfolioEntity.builder()
                .portfolioUnits(Collections.singletonList(portfolioUnit))
                .name("First portfolio")
                .balance(1000L)
                .build();

        UserEntity user = UserEntity.builder()
                .portfolios(Collections.singletonList(stockPortfolio))
                .username("Kirill")
                .roles(Collections.singleton(Role.USER))
                .email("kir.mololkin@yandex.ru")
                .password("1234")
                .build();

        UserEntity savedUser = userRepository.save(user);

        System.out.println(savedUser);
        return ResponseEntity.ok(new UserDto(savedUser));
    }

}

