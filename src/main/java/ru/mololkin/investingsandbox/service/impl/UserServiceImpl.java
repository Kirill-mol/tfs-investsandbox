package ru.mololkin.investingsandbox.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.repos.UserRepository;
import ru.mololkin.investingsandbox.service.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserEntity register(UserEntity user) {
        Set<Role> roles = Collections.singleton(Role.ROLE_USER);

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRoles(roles);

        UserEntity registeredUser = userRepository.save(user);

        log.info("In register - user: {} successfully registered", new UserDto(registeredUser));

        return registeredUser;
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
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
