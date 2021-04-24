package ru.mololkin.investingsandbox.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mololkin.investingsandbox.entitiy.UserEntity;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
}
