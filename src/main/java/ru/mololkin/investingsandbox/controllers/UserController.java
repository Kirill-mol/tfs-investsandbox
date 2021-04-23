package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.mololkin.investingsandbox.dto.UpdateUserDto;
import ru.mololkin.investingsandbox.dto.UserDto;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.mappers.UserEntityMapper;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.UserService;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/user")
public class UserController {

	private final UserService userService;
	private final UserEntityMapper userEntityMapper;
	private final JwtTokenProvider tokenProvider;

	@GetMapping("/profile")
	public UserDto getUserProfile(@RequestHeader("Authorization") String token) {
		try {
			UserEntity user = userService.findByEmail(tokenProvider.getEmail(token));

			return userEntityMapper.map(user);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			return new UserDto();
		}
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
