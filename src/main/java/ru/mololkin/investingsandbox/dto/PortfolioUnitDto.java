package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.Currency;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PortfolioUnitDto {
    private String shortname;
    private String symbol;
    private String quoteType;
    private String exchange;
    private Currency currency;
    private Integer quantity;
    private Double price;
}

