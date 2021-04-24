package ru.mololkin.investingsandbox.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mololkin.investingsandbox.dto.UpdateUserDto;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entitiy.UserEntity;
import ru.mololkin.investingsandbox.mapper.UserEntityMapper;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {

	private final UserService userService;
	private final UserEntityMapper userEntityMapper;
	private final JwtTokenProvider tokenProvider;

	@GetMapping("/profile")
	public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String token) {
		UserEntity user = userService.findByEmail(tokenProvider.getEmail(token));
		return ResponseEntity.ok(userEntityMapper.map(user));
	}

	@PutMapping("/profile")
	public ResponseEntity<UserDto> updateUserProfile(@RequestHeader("Authorization") String token,
	                                                 @RequestBody UpdateUserDto updateUserDto
	) {
		UserEntity user = userService.findByEmail(tokenProvider.getEmail(token));
		UserEntity updatedUser = userService.updateUser(user, updateUserDto);
		return ResponseEntity.ok(userEntityMapper.map(updatedUser));
	}
}
