package ru.mololkin.investingsandbox.service.impl;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ru.mololkin.investingsandbox.dto.SellPortfolioUnitDto;
import ru.mololkin.investingsandbox.entitiy.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entitiy.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.exception.UserErrorException;
import ru.mololkin.investingsandbox.repository.StockPortfolioRepository;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.StockPortfolioService;
import ru.mololkin.investingsandbox.service.UserService;
import ru.mololkin.investingsandbox.util.CurrencyExchanger;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StockPortfolioServiceImpl implements StockPortfolioService {
	private final CurrencyExchanger currencyExchanger;
	private final StockPortfolioRepository stockPortfolioRepository;
	private final UserService userService;
	private final JwtTokenProvider tokenProvider;

	public StockPortfolioEntity buyUnit(StockPortfolioEntity stockPortfolio,
	                                    PortfolioUnitEntity portfolioUnitEntity
	) {

		double unitsCost = currencyExchanger.exchange(portfolioUnitEntity.getCurrency(),
				stockPortfolio.getCurrency(), portfolioUnitEntity.getQuantity() * portfolioUnitEntity.getPrice());

		if (Double.compare(stockPortfolio.getBalance(), unitsCost) < 0) {
			throw new UserErrorException("Not enough money on the balance of portfolio: " +
					stockPortfolio.getName(), HttpStatus.BAD_REQUEST);
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

		return stockPortfolioRepository.save(stockPortfolio);
	}

	@Override
	public StockPortfolioEntity sellUnit(StockPortfolioEntity stockPortfolio,
	                                     SellPortfolioUnitDto sellPortfolioUnitDto
	) {
		PortfolioUnitEntity portfolioUnit = stockPortfolio.getPortfolioUnits().stream()
				.filter(unit -> unit.getSymbol().equals(sellPortfolioUnitDto.getSymbol()))
				.findAny()
				.orElseThrow(() -> new UserErrorException("No quote with symbol: " +
						sellPortfolioUnitDto.getSymbol()
						+ " in portfolio", HttpStatus.BAD_REQUEST));

		if (sellPortfolioUnitDto.getQuantity() < 1 ||
				portfolioUnit.getQuantity() < sellPortfolioUnitDto.getQuantity()
		) {
			throw new UserErrorException("Incorrect quotes quantity", HttpStatus.BAD_REQUEST);
		} else if (portfolioUnit.getQuantity() > sellPortfolioUnitDto.getQuantity()) {
			portfolioUnit.setQuantity(portfolioUnit.getQuantity() - sellPortfolioUnitDto.getQuantity());
		} else if (portfolioUnit.getQuantity().equals(sellPortfolioUnitDto.getQuantity())) {
			stockPortfolio.getPortfolioUnits().remove(portfolioUnit);
		}

		stockPortfolio.setBalance(stockPortfolio.getBalance()
				+ currencyExchanger.exchange(portfolioUnit.getCurrency(), stockPortfolio.getCurrency(),
				sellPortfolioUnitDto.getQuantity() * sellPortfolioUnitDto.getPrice()));

		return stockPortfolioRepository.save(stockPortfolio);
	}

	@Override
	public StockPortfolioEntity updatePortfolio(StockPortfolioEntity stockPortfolio,
	                                            String newName
	) {
		stockPortfolio.setName(newName);
		return stockPortfolioRepository.save(stockPortfolio);
	}

	@Override
	public StockPortfolioEntity findPortfolioByUserToken(String token, String portfolioName) {
		UserEntity user = userService.findByEmail(tokenProvider.getEmail(token));

		return user.getPortfolios().stream()
				.filter(portfolio -> portfolio.getName()
						.equals(portfolioName))
				.findAny()
				.orElseThrow(() -> new UserErrorException("No portfolio with name: "
						+ portfolioName, HttpStatus.BAD_REQUEST));
	}
}
