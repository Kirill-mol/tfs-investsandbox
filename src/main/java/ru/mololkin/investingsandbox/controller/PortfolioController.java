package ru.mololkin.investingsandbox.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mololkin.investingsandbox.dto.*;
import ru.mololkin.investingsandbox.entitiy.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entitiy.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.mapper.PortfolioUnitMapper;
import ru.mololkin.investingsandbox.mapper.StockPortfolioMapper;
import ru.mololkin.investingsandbox.repository.StockPortfolioRepository;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.StockPortfolioService;
import ru.mololkin.investingsandbox.service.UserService;
import ru.mololkin.investingsandbox.util.CurrencyExchanger;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user/portfolio")
public class PortfolioController {

	private final JwtTokenProvider tokenProvider;
	private final UserService userService;
	private final StockPortfolioMapper stockPortfolioMapper;
	private final PortfolioUnitMapper portfolioUnitMapper;
	private final StockPortfolioService stockPortfolioService;
	private final CurrencyExchanger currencyExchanger;
	private final StockPortfolioRepository stockPortfolioRepository;

	@PostMapping
	public ResponseEntity<?> createNewStockPortfolio(
			@RequestHeader("Authorization") String token,
			@Valid @RequestBody NewStockPortfolioDto newStockPortfolio
	) {
		String email = tokenProvider.getEmail(token);
		StockPortfolioEntity stockPortfolio = userService.addPortfolio(email, newStockPortfolio);
		return ResponseEntity.ok(stockPortfolioMapper.map(stockPortfolio));

	}


	@PostMapping("/quote")
	public ResponseEntity<StockPortfolioDto> buyPortfolioUnit(
			@RequestHeader("Authorization") String token,
			@Valid @RequestBody BuyPortfolioUnitDto buyPortfolioUnit
	) throws JsonProcessingException {
		StockPortfolioEntity stockPortfolio = stockPortfolioService
				.findPortfolioByUserToken(token, buyPortfolioUnit.getPortfolioName());

		PortfolioUnitEntity portfolioUnit = portfolioUnitMapper.map(buyPortfolioUnit);

		StockPortfolioEntity changedPortfolio = stockPortfolioService.buyUnit(stockPortfolio, portfolioUnit);

		return ResponseEntity.ok(stockPortfolioMapper.map(changedPortfolio));
	}

	@PutMapping("/quote")
	public ResponseEntity<StockPortfolioDto> sellPortfolioUnit(
			@RequestHeader("Authorization") String token,
			@Valid @RequestBody SellPortfolioUnitDto sellPortfolioUnitDto
	) throws JsonProcessingException {
		StockPortfolioEntity stockPortfolio = stockPortfolioService
				.findPortfolioByUserToken(token, sellPortfolioUnitDto.getPortfolioName());

		StockPortfolioEntity saved = stockPortfolioService.sellUnit(stockPortfolio, sellPortfolioUnitDto);

		return ResponseEntity.ok(stockPortfolioMapper.map(saved));

	}

	@DeleteMapping("{name}")
	public ResponseEntity<BaseResponseDto> deletePortfolio(@RequestHeader("Authorization") String token,
	                                                       @PathVariable("name") String portfolioName
	) {
		UserEntity user = userService.findByEmail(tokenProvider.getEmail(token));

		userService.deletePortfolio(user, portfolioName);
		return ResponseEntity.ok(new BaseResponseDto("Portfolio with name: " + portfolioName + " was deleted"));
	}

	@PutMapping()
	public ResponseEntity<StockPortfolioDto> changePortfolioName(
			@RequestHeader("Authorization") String token,
			@Valid @RequestBody UpdatePortfolioDto updatePortfolioDto
	) {

		StockPortfolioEntity stockPortfolio = stockPortfolioService
				.findPortfolioByUserToken(token, updatePortfolioDto.getOldName());

		StockPortfolioEntity savedPortfolio = stockPortfolioService
				.updatePortfolio(stockPortfolio, updatePortfolioDto.getNewName());

		return ResponseEntity.ok(stockPortfolioMapper.map(savedPortfolio));
	}
}

