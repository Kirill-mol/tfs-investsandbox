package ru.mololkin.investingsandbox.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.mololkin.investingsandbox.exception.dto.BaseExceptionResponseDto;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@ControllerAdvice
public class SecurityExceptionHandler {

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<BaseExceptionResponseDto> handleBadCredentialsException(BadCredentialsException ex) {
		return ResponseEntity.status(403).body(new BaseExceptionResponseDto(
				ex.getMessage(),
				HttpStatus.FORBIDDEN));
	}
}
