package ru.mololkin.investingsandbox.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@Getter
public class ServerErrorException extends RuntimeException {
	private final HttpStatus httpStatus;

	public ServerErrorException(String message) {
		super(message);
		this.httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
	}
}
