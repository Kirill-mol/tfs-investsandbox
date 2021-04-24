package ru.mololkin.investingsandbox.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import ru.mololkin.investingsandbox.dto.SellPortfolioUnitDto;
import ru.mololkin.investingsandbox.dto.UpdatePortfolioDto;
import ru.mololkin.investingsandbox.entitiy.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entitiy.StockPortfolioEntity;

public interface StockPortfolioService {
	StockPortfolioEntity buyUnit(StockPortfolioEntity stockPortfolio,
	                             PortfolioUnitEntity portfolioUnitEntity)
			throws JsonProcessingException;

	StockPortfolioEntity sellUnit(StockPortfolioEntity stockPortfolioEntity,
	                              SellPortfolioUnitDto sellPortfolioUnitDto) throws JsonProcessingException;

	StockPortfolioEntity updatePortfolio(StockPortfolioEntity stockPortfolio, String newName);

	StockPortfolioEntity findPortfolioByUserToken(String token, String portfolioName);
}
