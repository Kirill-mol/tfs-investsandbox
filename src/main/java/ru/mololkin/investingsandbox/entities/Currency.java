package ru.mololkin.investingsandbox.entities;

import lombok.AllArgsConstructor;

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
				.orElseThrow(() -> new RuntimeException("No such currency"));
	}
}
