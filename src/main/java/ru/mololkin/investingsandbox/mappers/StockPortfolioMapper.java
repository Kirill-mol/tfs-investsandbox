package ru.mololkin.investingsandbox.mappers;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.mololkin.investingsandbox.dto.NewStockPortfolioDto;
import ru.mololkin.investingsandbox.dto.StockPortfolioDto;
import ru.mololkin.investingsandbox.entities.Currency;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class StockPortfolioMapper {

	private final PortfolioUnitMapper portfolioUnitMapper;

	public StockPortfolioDto map(StockPortfolioEntity stockPortfolio) {
		return StockPortfolioDto.builder()
				.name(stockPortfolio.getName())
				.balance(stockPortfolio.getBalance())
				.initBalance(stockPortfolio.getStartBalance())
				.currency(stockPortfolio.getCurrency().name())
				.quotes(stockPortfolio.getPortfolioUnits().stream()
						.map(portfolioUnitMapper::map).collect(Collectors.toList()))
				.monthHistory(stockPortfolio.getMonthHistory())
				.allTimeHistory(stockPortfolio.getAllTimeHistory())
				.build();
	}

	public StockPortfolioEntity map(NewStockPortfolioDto stockPortfolioDto) {
		return StockPortfolioEntity.builder()
				.name(stockPortfolioDto.getName())
				.balance(stockPortfolioDto.getBalance())
				.startBalance(stockPortfolioDto.getBalance())
				.currency(Currency.getCurrencyByName(stockPortfolioDto.getCurrency()))
				.portfolioUnits(new ArrayList<>())
				.build();
	}
}
