package ru.mololkin.investingsandbox.mappers;

import org.springframework.stereotype.Component;
import ru.mololkin.investingsandbox.dto.NewPortfolioUnitDTO;
import ru.mololkin.investingsandbox.dto.PortfolioUnitDto;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;

@Component
public class PortfolioUnitMapper {

	public PortfolioUnitDto map(PortfolioUnitEntity portfolioUnitEntity) {
		return PortfolioUnitDto.builder()
				.shortname(portfolioUnitEntity.getShortname())
				.symbol(portfolioUnitEntity.getSymbol())
				.quoteType(portfolioUnitEntity.getQuoteType())
				.exchange(portfolioUnitEntity.getExchange())
				.currency(portfolioUnitEntity.getCurrency())
				.quantity(portfolioUnitEntity.getQuantity())
				.build();
	}

	public PortfolioUnitEntity map(NewPortfolioUnitDTO newPortfolioUnit) {
		return PortfolioUnitEntity
				.builder()
				.shortname(newPortfolioUnit.getShortname())
				.symbol(newPortfolioUnit.getSymbol())
				.quoteType(newPortfolioUnit.getQuoteType())
				.exchange(newPortfolioUnit.getExchange())
				.currency(newPortfolioUnit.getCurrency())
				.quantity(newPortfolioUnit.getQuantity())
				.price(newPortfolioUnit.getPrice())
				.build();
	}
}
