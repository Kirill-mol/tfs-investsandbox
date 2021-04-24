package ru.mololkin.investingsandbox.mapper;

import org.springframework.stereotype.Component;
import ru.mololkin.investingsandbox.dto.BuyPortfolioUnitDto;
import ru.mololkin.investingsandbox.dto.PortfolioUnitDto;
import ru.mololkin.investingsandbox.entitiy.PortfolioUnitEntity;

@Component
public class PortfolioUnitMapper {

	public PortfolioUnitDto map(PortfolioUnitEntity portfolioUnitEntity) {
		return PortfolioUnitDto.builder()
				.shortname(portfolioUnitEntity.getShortname())
				.symbol(portfolioUnitEntity.getSymbol())
				.exchange(portfolioUnitEntity.getExchange())
				.currency(portfolioUnitEntity.getCurrency())
				.quantity(portfolioUnitEntity.getQuantity())
				.build();
	}

	public PortfolioUnitEntity map(BuyPortfolioUnitDto newPortfolioUnit) {
		return PortfolioUnitEntity
				.builder()
				.shortname(newPortfolioUnit.getShortname())
				.symbol(newPortfolioUnit.getSymbol())
				.exchange(newPortfolioUnit.getExchange())
				.currency(newPortfolioUnit.getCurrency())
				.quantity(newPortfolioUnit.getQuantity())
				.price(newPortfolioUnit.getPrice())
				.build();
	}
}
