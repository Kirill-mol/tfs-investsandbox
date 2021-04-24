package ru.mololkin.investingsandbox.exception.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ru.mololkin.investingsandbox.exception.dto.ValidationExceptionDto;

import java.util.HashMap;
import java.util.Map;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@ControllerAdvice
public class ValidationExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ValidationExceptionDto> handleValidationException(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});

		ValidationExceptionDto exceptionDto = new ValidationExceptionDto(
				"Exception while validating request body", HttpStatus.BAD_REQUEST, errors);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exceptionDto);
	}
}
