package ru.mololkin.investingsandbox.exception.handler;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.mololkin.investingsandbox.exception.ServerErrorException;
import ru.mololkin.investingsandbox.exception.dto.BaseExceptionResponseDto;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@ControllerAdvice
public class ServerExceptionHandler {
	@ExceptionHandler(ServerErrorException.class)
	public ResponseEntity<BaseExceptionResponseDto> handleServerException(ServerErrorException ex) {
		return ResponseEntity
				.status(ex.getHttpStatus())
				.body(new BaseExceptionResponseDto(ex.getMessage(), ex.getHttpStatus()));
	}
}
