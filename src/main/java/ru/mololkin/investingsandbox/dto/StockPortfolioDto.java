package ru.mololkin.investingsandbox.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

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
    private Map<Integer, Double> monthHistory;
    private Map<Integer, Double> allTimeHistory;
}
