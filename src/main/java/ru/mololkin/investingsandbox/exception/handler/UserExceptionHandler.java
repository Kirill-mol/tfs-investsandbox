package ru.mololkin.investingsandbox.exception.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.mololkin.investingsandbox.exception.UserErrorException;
import ru.mololkin.investingsandbox.exception.dto.BaseExceptionResponseDto;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@ControllerAdvice
public class UserExceptionHandler {
	@ExceptionHandler(UserErrorException.class)
	public ResponseEntity<BaseExceptionResponseDto> handleAlreadyExistsException(UserErrorException ex) {
		return ResponseEntity
				.status(ex.getHttpStatus())
				.body(new BaseExceptionResponseDto(ex.getMessage(), ex.getHttpStatus()));
	}
}
