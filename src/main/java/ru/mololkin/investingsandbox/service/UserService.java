package ru.mololkin.investingsandbox.service;

import ru.mololkin.investingsandbox.entities.UserEntity;

import java.util.List;

public interface UserService {
    UserEntity register(UserEntity user);

    List<UserEntity> getAll();

    UserEntity findByEmail(String email);

    UserEntity findById(Long id);

    void delete(Long id);
}
