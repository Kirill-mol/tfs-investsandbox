package ru.mololkin.investingsandbox.exception.dto;

import lombok.*;
import org.springframework.http.HttpStatus;
import ru.mololkin.investingsandbox.dto.BaseResponseDto;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class BaseExceptionResponseDto extends BaseResponseDto {
	private int status;
	private String error;

	public BaseExceptionResponseDto(String message, HttpStatus httpStatus) {
		super(message);
		this.status = httpStatus.value();
		this.error = httpStatus.name();
	}
}
