package ru.mololkin.investingsandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePortfolioDto {
	@NotNull
	private String oldName;
	@NotNull
	private String newName;
}
