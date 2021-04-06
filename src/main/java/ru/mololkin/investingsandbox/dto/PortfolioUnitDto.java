package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortfolioUnitDto {
    private String name;
    private String ticker;
    private Integer quantity;

    public PortfolioUnitDto(PortfolioUnitEntity portfolioUnitEntity) {
        this.name = portfolioUnitEntity.getName();
        this.ticker = portfolioUnitEntity.getTicker();
        this.quantity = portfolioUnitEntity.getQuantity();
    }
}
