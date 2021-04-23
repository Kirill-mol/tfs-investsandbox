package ru.mololkin.investingsandbox.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import ru.mololkin.investingsandbox.dto.response.ExchangeResponse;
import ru.mololkin.investingsandbox.entities.Currency;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class CurrencyExchanger {

	@Value("${exchanger.key}")
	private String key;

	private static final UriComponents uriComponents = UriComponentsBuilder.newInstance()
			.scheme("https")
			.host("fixer-fixer-currency-v1.p.rapidapi.com")
			.path("/convert")
			.query("to={to}")
			.query("from={from}")
			.query("amount={amount}")
			.build();

	private final RestTemplate restTemplate;

	public double exchange(Currency from, Currency to, Double quantity) throws JsonProcessingException {
		if (from.equals(to)) {
			return quantity;
		}

		Map<String, String> keyParams = new HashMap<>();
		keyParams.put("from", from.name);
		keyParams.put("to", to.name);
		keyParams.put("amount", quantity.toString());

		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.set("x-rapidapi-key", "02b00b2719msh3c8323995f471f6p1cddc1jsn4329456b5a08");
		headers.set("x-rapidapi-host", "fixer-fixer-currency-v1.p.rapidapi.com");
		headers.set("useQueryString", "true");

		URI uri = uriComponents.expand(keyParams).toUri();
		HttpEntity<String> request = new HttpEntity<>(headers);

		log.info("Request to uri: " + uri.toString());

		String body = restTemplate.exchange(uri, HttpMethod.GET, request, String.class).getBody();

		log.info("Request result: " + body);

		ObjectMapper mapper = new ObjectMapper();
		SimpleModule module = new SimpleModule();
		module.addDeserializer(ExchangeResponse.class, new ResponseDeserializer());
		mapper.registerModule(module);

		ExchangeResponse exchangeResponse = mapper.readValue(body, ExchangeResponse.class);

		return exchangeResponse.getResult();
	}
}

