package ru.mololkin.investingsandbox.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.mololkin.investingsandbox.dto.AuthRequestDto;
import ru.mololkin.investingsandbox.dto.AuthResponseDto;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.propertiy.JwtProperties;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.UserService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthRestController {
	private final AuthenticationManager authManager;
	private final JwtTokenProvider jwtTokenProvider;
	private final UserService userService;
	private final JwtProperties jwtProperties;

	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody AuthRequestDto requestDto) {
		String email = requestDto.getEmail();

		authManager.authenticate(new UsernamePasswordAuthenticationToken(email, requestDto.getPassword()));

		UserEntity user = userService.findByEmail(email);

		if (user == null) {
			throw new UsernameNotFoundException(String.format("User with email: %s not found", email));
		}

		String token = jwtTokenProvider.createToken(email, user.getRoles());

		AuthResponseDto responseDto = AuthResponseDto.builder()
				.email(email)
				.token(token)
				.expiration(jwtProperties.getExpiration()).build();

		return ResponseEntity.ok(responseDto);

	}


}

