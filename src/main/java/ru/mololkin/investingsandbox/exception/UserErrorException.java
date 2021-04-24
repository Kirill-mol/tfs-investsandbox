package ru.mololkin.investingsandbox.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@Getter
public class UserErrorException extends RuntimeException {
	private final HttpStatus httpStatus;

	public UserErrorException(String message, HttpStatus httpStatus) {
		super(message);
		this.httpStatus = httpStatus;
	}
}
