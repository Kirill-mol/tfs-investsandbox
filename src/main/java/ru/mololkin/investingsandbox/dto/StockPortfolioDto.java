package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;

import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StockPortfolioDto {
    private String name;
    private Long balance;
    private List<PortfolioUnitDto> portfolioUnits;


    public StockPortfolioDto(StockPortfolioEntity stockPortfolio) {
        this.name = stockPortfolio.getName();
        this.balance = stockPortfolio.getBalance();
        this.portfolioUnits = stockPortfolio.getPortfolioUnits().stream()
                .map(PortfolioUnitDto::new).collect(Collectors.toList());
    }
}
