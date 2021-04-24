package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellPortfolioUnitDto {
	@NotNull(message = "portfolio name mustn't be null")
	private String portfolioName;
	@NotNull(message = "symbol mustn't be null")
	private String symbol;
	@NotNull(message = "quantity mustn't be null")
	private Integer quantity;
	@NotNull(message = "price mustn't be null")
	@DecimalMin(value = "0.0", message = "price must be positive")
	private Double price;
}
