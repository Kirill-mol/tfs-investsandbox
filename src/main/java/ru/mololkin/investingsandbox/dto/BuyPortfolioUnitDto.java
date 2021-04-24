package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entitiy.Currency;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyPortfolioUnitDto {
	@NotNull(message = "portfolio name mustn't be null")
	private String portfolioName;
	@NotNull(message = "short name mustn't be null")
	private String shortname;
	@NotNull(message = "symbol mustn't be null")
	private String symbol;
	@NotNull(message = "quoteType mustn't be null")
	private String quoteType;
	@NotNull(message = "exchange mustn't be null")
	private String exchange;
	@NotNull(message = "currency mustn't be null")
	private Currency currency;
	@NotNull(message = "quantity mustn't be null")
	@Min(value = 1, message = "quantity must be higher then 0")
	private Integer quantity;
	@NotNull(message = "price mustn't be null")
	@DecimalMin(value = "0.0", message = "price must be positive")
	private Double price;
}
