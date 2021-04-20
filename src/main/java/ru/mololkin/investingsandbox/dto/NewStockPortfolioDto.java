package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewStockPortfolioDto {
	private String name;
	private Double balance;
	private String currency;
}

