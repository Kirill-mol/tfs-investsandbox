package ru.mololkin.investingsandbox.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ru.mololkin.investingsandbox.dto.AuthRequestDto;
import ru.mololkin.investingsandbox.dto.AuthResponseDto;
import ru.mololkin.investingsandbox.entities.UserEntity;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;
import ru.mololkin.investingsandbox.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/auth")
public class AuthRestController {
    private final AuthenticationManager authManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequestDto requestDto) {
        try {
            String email = requestDto.getEmail();

            authManager.authenticate(new UsernamePasswordAuthenticationToken(email, requestDto.getPassword()));

            UserEntity user = userService.findByEmail(email);


            if (user == null) {
                throw new UsernameNotFoundException(String.format("User with email: %s not found", email));
            }

            String token = jwtTokenProvider.createToken(email, user.getRoles());

            AuthResponseDto responseDto = new AuthResponseDto(email, token);

            return ResponseEntity.ok(responseDto);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

}

