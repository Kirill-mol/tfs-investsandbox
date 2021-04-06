package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.UserEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private String email;
    private String username;
    private Set<Role> roles;
    private List<StockPortfolioDto> portfolios = new ArrayList<>();

    public UserDto(UserEntity user) {
        this.email = user.getEmail();
        this.username = user.getUsername();
        this.roles = user.getRoles();
        if (user.getPortfolios() != null) {
            this.portfolios = user.getPortfolios().stream()
                    .map(StockPortfolioDto::new).collect(Collectors.toList());
        }
    }
}

