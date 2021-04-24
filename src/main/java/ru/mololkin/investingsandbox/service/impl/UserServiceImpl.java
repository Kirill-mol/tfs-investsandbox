package ru.mololkin.investingsandbox.service.impl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.mololkin.investingsandbox.dto.NewStockPortfolioDto;
import ru.mololkin.investingsandbox.dto.UpdateUserDto;
import ru.mololkin.investingsandbox.entitiy.Role;
import ru.mololkin.investingsandbox.entitiy.StockPortfolioEntity;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.exception.UserErrorException;
import ru.mololkin.investingsandbox.mapper.StockPortfolioMapper;
import ru.mololkin.investingsandbox.mapper.UserEntityMapper;
import ru.mololkin.investingsandbox.repository.UserRepository;
import ru.mololkin.investingsandbox.security.jwt.JwtUser;
import ru.mololkin.investingsandbox.security.jwt.JwtUserFactory;
import ru.mololkin.investingsandbox.service.UserService;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserEntityMapper userEntityMapper;
	private final StockPortfolioMapper stockPortfolioMapper;

	@Override
	public UserEntity register(UserEntity user) {
		Set<Role> roles = Collections.singleton(Role.ROLE_USER);

		user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
		user.setRoles(roles);

		UserEntity registeredUser = userRepository.save(user);

		log.info("In register - user: {} successfully registered", userEntityMapper.map(registeredUser));

		return registeredUser;
	}

	@Override
	public UserEntity save(UserEntity user) {
		return userRepository.save(user);
	}

	@Override
	public List<UserEntity> getAll() {
		List<UserEntity> users = userRepository.findAll();

		log.info("IN getAll - {} users found", users.size());

		return users;
	}

	@Override
	public UserEntity findByEmail(String email) {
		return userRepository.findByEmail(email).orElseThrow(() ->
				new UserErrorException("Wrong email or token", HttpStatus.BAD_REQUEST));
	}

	@Override
	public UserEntity findById(Long id) {
		return userRepository.findById(id).orElseThrow(NoSuchFieldError::new);
	}

	@Override
	public StockPortfolioEntity addPortfolio(String email, NewStockPortfolioDto stockPortfolio) {
		UserEntity user = findByEmail(email);

		List<StockPortfolioEntity> portfolios = user.getPortfolios().stream()
				.filter(portfolio -> portfolio.getName().equals(stockPortfolio.getName()))
				.collect(Collectors.toList());

		if (portfolios.size() == 0) {

			StockPortfolioEntity stockPortfolioEntity = stockPortfolioMapper.map(stockPortfolio);

			user.getPortfolios().add(stockPortfolioEntity);

			save(user);
			return stockPortfolioEntity;
		} else {
			throw new UserErrorException("Portfolio with such name exists", HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public UserEntity updateUser(UserEntity user, UpdateUserDto updateUserDto) {
		user.setPassword(updateUserDto.getPassword() == null ? user.getPassword() :
				new BCryptPasswordEncoder().encode(updateUserDto.getPassword()));

		user.setEmail(updateUserDto.getEmail() == null ? user.getEmail() :
				updateUserDto.getEmail());

		user.setNickname(updateUserDto.getNickname() == null ? user.getNickname() :
				updateUserDto.getNickname());

		return save(user);
	}

	@Override
	public void deletePortfolio(UserEntity user, String portfolioName) {
		StockPortfolioEntity stockPortfolioEntity = user.getPortfolios().stream()
				.filter(portfolio -> portfolio.getName().equals(portfolioName))
				.findAny()
				.orElseThrow(() ->
						new UserErrorException("No such portfolio: " + portfolioName, HttpStatus.BAD_REQUEST));

		if (user.getPortfolios().remove(stockPortfolioEntity)) {
			save(user);
		} else {
			throw new UserErrorException("No portfolio with name: " + portfolioName, HttpStatus.BAD_REQUEST);
		}

	}

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		UserEntity user = findByEmail(email);

		if (user == null) {
			throw new UsernameNotFoundException("User with email: " + email + " not found");
		}

		JwtUser jwtUser = JwtUserFactory.create(user);
		log.info("IN loadUserByUsername - user with email: {} successfully loaded", email);
		return jwtUser;
	}
}
