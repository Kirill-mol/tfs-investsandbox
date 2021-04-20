package ru.mololkin.investingsandbox.security.jwt;

import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.UserEntity;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@NoArgsConstructor
public final class JwtUserFactory {

    public static JwtUser create(UserEntity user) {
        return new JwtUser(
                user.getId(),
                user.getNickname(),
                user.getEmail(),
                user.getPassword(),
                mapToGrantedAuthorities(user.getRoles()));
    }

    private static List<GrantedAuthority> mapToGrantedAuthorities(Set<Role> userRoles) {
        return userRoles.stream()
                .map(role ->
                        new SimpleGrantedAuthority(role.name())
                ).collect(Collectors.toList());
    }
}
