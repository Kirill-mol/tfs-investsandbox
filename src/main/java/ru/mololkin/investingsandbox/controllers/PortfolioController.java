package ru.mololkin.investingsandbox.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mololkin.investingsandbox.dto.NewPortfolioUnitDTO;
import ru.mololkin.investingsandbox.dto.NewStockPortfolioDto;
import ru.mololkin.investingsandbox.entities.PortfolioUnitEntity;
import ru.mololkin.investingsandbox.entities.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.mappers.PortfolioUnitMapper;
import ru.mololkin.investingsandbox.mappers.StockPortfolioMapper;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.StockPortfolioService;
import ru.mololkin.investingsandbox.service.UserService;

import java.util.Arrays;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user/portfolio")
public class PortfolioController {

	private final JwtTokenProvider tokenProvider;
	private final UserService userService;
	private final StockPortfolioMapper stockPortfolioMapper;
	private final PortfolioUnitMapper portfolioUnitMapper;
	private final StockPortfolioService stockPortfolioService;

	@PostMapping
	public ResponseEntity<?> createNewStockPortfolio(
			@RequestHeader("Authorization") String token,
			@RequestBody NewStockPortfolioDto newStockPortfolio
	) {
		String email = tokenProvider.getEmail(token);

		try {
			StockPortfolioEntity stockPortfolio = userService.addPortfolio(email, newStockPortfolio);
			return ResponseEntity.ok(stockPortfolioMapper.map(stockPortfolio));
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/quote")
	public ResponseEntity<?> buyPortfolioUnit(
			@RequestHeader("Authorization") String token,
			@RequestBody NewPortfolioUnitDTO newPortfolioUnit
	) throws JsonProcessingException {
		String email = tokenProvider.getEmail(token);

		UserEntity user = userService.findByEmail(email);

		StockPortfolioEntity stockPortfolio = user.getPortfolios().stream()
				.filter(portfolio -> portfolio.getName()
						.equals(newPortfolioUnit.getPortfolioName()))
				.findAny()
				.orElseThrow(() -> new RuntimeException("No such portfolio"));

		PortfolioUnitEntity portfolioUnit = portfolioUnitMapper.map(newPortfolioUnit);

		StockPortfolioEntity changedPortfolio = stockPortfolioService.buyUnit(stockPortfolio, portfolioUnit);

		return ResponseEntity.ok(stockPortfolioMapper.map(changedPortfolio));
	}

	@DeleteMapping("{name}")
	public ResponseEntity<?> deletePortfolio(@RequestHeader("Authorization") String token,
	                                         @PathVariable("name") String portfolioName
	) {

		System.out.println(portfolioName);

		UserEntity user = userService.findByEmail(tokenProvider.getEmail(token));

		if (userService.deletePortfolio(user, portfolioName)) {
			return ResponseEntity.ok("Portfolio with name: " + portfolioName + " was deleted");
		} else {
			return ResponseEntity.badRequest().body("No such portfolio");
		}

	}
}
