package ru.mololkin.investingsandbox.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;

public interface StockPortfolioService {
	StockPortfolioEntity buyUnit(StockPortfolioEntity stockPortfolio,
	                             PortfolioUnitEntity portfolioUnitEntity)
			throws JsonProcessingException;
}
