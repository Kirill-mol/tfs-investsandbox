package ru.mololkin.investingsandbox.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entitiy.UserEntity;

import java.util.ArrayList;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserEntityMapper {

	private final StockPortfolioMapper stockPortfolioMapper;

	public UserDto map(UserEntity user) {
		return UserDto.builder()
				.email(user.getEmail())
				.nickname(user.getNickname())
				.portfolios(user.getPortfolios() == null ? new ArrayList<>() :
						user.getPortfolios().stream()
								.map(stockPortfolioMapper::map)
								.collect(Collectors.toList()))
				.build();
	}

	public UserEntity map(UserDto userDto) {
		return UserEntity.builder()
				.email(userDto.getEmail())
				.password(userDto.getPassword())
				.nickname(userDto.getNickname())
				.build();
	}
}
