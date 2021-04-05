package ru.mololkin.investingsandbox.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.mololkin.investingsandbox.entities.UserEntity;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    List<UserEntity>findAllByUsername(String username);
}
