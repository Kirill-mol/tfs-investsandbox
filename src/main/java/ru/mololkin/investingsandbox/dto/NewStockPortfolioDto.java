package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewStockPortfolioDto {
	@NotNull(message = "name mustn't be null")
	private String name;
	@NotNull(message = "balance mustn't be null")
	@DecimalMin(value = "0.0", message = "balance must be positive")
	private Double balance;
	@NotNull(message = "currency mustn't be null")
	private String currency;
}

