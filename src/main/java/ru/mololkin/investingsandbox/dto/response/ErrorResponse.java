package ru.mololkin.investingsandbox.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 23.04.2021
 */
public class ErrorResponse {
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
	private LocalDateTime timestamp;
	private int status;
	private String error;
	private String path;
	private String message;
	private HttpStatus httpStatus;

	/**
	 * @param status  http response status code
	 * @param message Error message
	 * @param path    Path where exception was thrown
	 */
	public ErrorResponse(String message, HttpStatus status, String path) {
		this.message = message;
		this.httpStatus = status;
		this.timestamp = LocalDateTime.now();
		this.status = status.value();
		this.error = status.toString();
		this.path = path;
	}
}
