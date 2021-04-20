package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.Role;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDto {
    private String email;
    private String password;
    private String nickname;
    private Set<Role> roles;
    private List<StockPortfolioDto> portfolios;
}

