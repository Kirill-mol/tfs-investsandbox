package ru.mololkin.investingsandbox.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mololkin.investingsandbox.dto.NewStockPortfolioDto;
import ru.mololkin.investingsandbox.dto.UpdateUserDto;
import ru.mololkin.investingsandbox.entities.Currency;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.mappers.StockPortfolioMapper;
import ru.mololkin.investingsandbox.mappers.UserEntityMapper;
import ru.mololkin.investingsandbox.repos.UserRepository;
import ru.mololkin.investingsandbox.security.jwt.JwtUser;
import ru.mololkin.investingsandbox.security.jwt.JwtUserFactory;
import ru.mololkin.investingsandbox.service.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserEntityMapper userEntityMapper;
    private final StockPortfolioMapper stockPortfolioMapper;

    @Override
    public UserEntity register(UserEntity user) {
        Set<Role> roles = Collections.singleton(Role.ROLE_USER);

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRoles(roles);

        UserEntity registeredUser = userRepository.save(user);

        log.info("In register - user: {} successfully registered", userEntityMapper.map(registeredUser));

        return registeredUser;
    }

    @Override
    public UserEntity save(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public List<UserEntity> getAll() {
        List<UserEntity> users = userRepository.findAll();

        log.info("IN getAll - {} users found", users.size());

        return users;
    }

    @Override
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public UserEntity findById(Long id) {
        return userRepository.findById(id).orElseThrow(NoSuchFieldError::new);
    }

    @Override
    public StockPortfolioEntity addPortfolio(String email, NewStockPortfolioDto stockPortfolio) {
        UserEntity user = findByEmail(email);

        List<StockPortfolioEntity> portfolios = user.getPortfolios().stream()
                .filter(portfolio -> portfolio.getName().equals(stockPortfolio.getName()))
                .collect(Collectors.toList());

        if (portfolios.size() == 0) {

            StockPortfolioEntity stockPortfolioEntity = stockPortfolioMapper.map(stockPortfolio);

            user.getPortfolios().add(stockPortfolioEntity);

            save(user);
            return stockPortfolioEntity;
        } else {
            throw new RuntimeException("Portfolio with such name exists");
        }
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity updateUser(UserEntity user, UpdateUserDto updateUserDto) {
        user.setPassword(new BCryptPasswordEncoder().encode(updateUserDto.getPassword()));
        user.setEmail(updateUserDto.getEmail());
        user.setNickname(updateUserDto.getEmail());

        return save(user);
    }

    @Override
    public boolean deletePortfolio(UserEntity user, String portfolioName) {
        StockPortfolioEntity stockPortfolioEntity = user.getPortfolios().stream()
                .filter(portfolio -> portfolio.getName().equals(portfolioName))
                .findAny()
                .orElseThrow(() -> new RuntimeException("No such portfolio"));

        boolean result = user.getPortfolios().remove(stockPortfolioEntity);

        save(user);

        return result;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user = findByEmail(email);

        if (user == null) {
            throw new UsernameNotFoundException("User with email: " + email + " not found");
        }

        JwtUser jwtUser = JwtUserFactory.create(user);
        log.info("IN loadUserByUsername - user with email: {} successfully loaded", email);
        return jwtUser;
    }
}
