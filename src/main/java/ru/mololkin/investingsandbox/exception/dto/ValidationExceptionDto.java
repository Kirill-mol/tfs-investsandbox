package ru.mololkin.investingsandbox.exception.dto;

import lombok.*;
import org.springframework.http.HttpStatus;

import java.util.Map;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ValidationExceptionDto extends BaseExceptionResponseDto{
	private Map<String, String> errorFields;

	public ValidationExceptionDto(String message, HttpStatus httpStatus, Map<String, String> errors) {
		super(message, httpStatus);
		this.errorFields = errors;
	}
}
