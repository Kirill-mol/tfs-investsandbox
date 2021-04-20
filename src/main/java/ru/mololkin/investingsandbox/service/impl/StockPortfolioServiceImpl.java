package ru.mololkin.investingsandbox.service.impl;


import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.mappers.PortfolioUnitMapper;
import ru.mololkin.investingsandbox.repos.StockPortfolioRepository;
import ru.mololkin.investingsandbox.service.StockPortfolioService;
import ru.mololkin.investingsandbox.utils.CurrencyExchanger;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StockPortfolioServiceImpl implements StockPortfolioService {
	private final CurrencyExchanger currencyExchanger;
	private final StockPortfolioRepository stockPortfolioRepository;

	public StockPortfolioEntity buyUnit(StockPortfolioEntity stockPortfolio,
	                                    PortfolioUnitEntity portfolioUnitEntity)
			throws JsonProcessingException {

		double unitsCost = currencyExchanger.exchange(portfolioUnitEntity.getCurrency(),
				stockPortfolio.getCurrency(), portfolioUnitEntity.getQuantity() * portfolioUnitEntity.getPrice());

		if (Double.compare(stockPortfolio.getBalance(), unitsCost) < 0) {
			throw new RuntimeException("Not enough money on the balance of portfolio: " +
					stockPortfolio.getName());
		}

		Optional<PortfolioUnitEntity> optPortfolioUnit = stockPortfolio.getPortfolioUnits().stream()
				.filter(unit -> portfolioUnitEntity.getSymbol().equals(unit.getSymbol()))
				.findAny();

		if (optPortfolioUnit.isEmpty()) {
			stockPortfolio.getPortfolioUnits().add(portfolioUnitEntity);
		} else {
			PortfolioUnitEntity portfolioUnit = optPortfolioUnit.get();
			portfolioUnit.setQuantity(portfolioUnit.getQuantity() + portfolioUnitEntity.getQuantity());
		}
		stockPortfolio.setBalance(stockPortfolio.getBalance() - unitsCost);

		StockPortfolioEntity savedPortfolio = stockPortfolioRepository.save(stockPortfolio);

		return savedPortfolio;
	}
}
