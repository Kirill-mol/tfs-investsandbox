package ru.mololkin.investingsandbox.entities.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.Role;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entities.UserEntity;

import java.util.List;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private String email;
    private String password;
    private String username;
    private Set<Role> roles;
    //private List<StockPortfolioEntity> portfolios;

    public UserDto(UserEntity user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.username = user.getUsername();
        this.roles = user.getRoles();
        //this.portfolios = user.getPortfolios();
    }
}

