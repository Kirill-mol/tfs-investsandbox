package ru.mololkin.investingsandbox.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.mololkin.investingsandbox.dto.NewStockPortfolioDto;
import ru.mololkin.investingsandbox.dto.UpdateUserDto;
import ru.mololkin.investingsandbox.entities.Currency;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entities.UserEntity;

import java.util.List;

public interface UserService extends UserDetailsService {
    UserEntity register(UserEntity user);

    UserEntity save(UserEntity user);

    List<UserEntity> getAll();

    UserEntity findByEmail(String email);

    UserEntity findById(Long id);

    StockPortfolioEntity addPortfolio(String email, NewStockPortfolioDto stockPortfolioEntity);

    void delete(Long id);

    UserEntity updateUser(UserEntity user, UpdateUserDto updateUserDto);

    boolean deletePortfolio(UserEntity user, String portfolioName);
}
