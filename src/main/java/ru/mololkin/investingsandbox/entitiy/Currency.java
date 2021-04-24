package ru.mololkin.investingsandbox.entitiy;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import ru.mololkin.investingsandbox.exception.UserErrorException;

import java.util.Arrays;

@AllArgsConstructor
public enum Currency {
	USD("USD"),
	EUR("EUR"),
	RUB("RUB");

	public final String name;

	public static Currency getCurrencyByName(String currency) {
		return Arrays.stream(Currency.values())
				.filter(c -> c.name.equals(currency))
				.findAny()
				.orElseThrow(() -> new UserErrorException("No such currency", HttpStatus.BAD_REQUEST));
	}
}
