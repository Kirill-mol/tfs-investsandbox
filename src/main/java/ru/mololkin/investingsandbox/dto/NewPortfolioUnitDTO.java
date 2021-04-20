package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mololkin.investingsandbox.entities.Currency;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewPortfolioUnitDTO {
	private String portfolioName;
	private String shortname;
	private String symbol;
	private String quoteType;
	private String exchange;
	private Currency currency;
	private Integer quantity;
	private Double price;
}
