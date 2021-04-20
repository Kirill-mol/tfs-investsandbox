package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StockPortfolioDto {
    private String name;
    private Double balance;
    private Double initBalance;
    private String currency;
    private List<PortfolioUnitDto> quotes;
    private List<Double> monthHistory;
    private List<Double> allTimeHistory;
}
