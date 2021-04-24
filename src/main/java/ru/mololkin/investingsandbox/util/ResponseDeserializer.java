package ru.mololkin.investingsandbox.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.TreeNode;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import ru.mololkin.investingsandbox.dto.response.ExchangeResponse;

import java.io.IOException;

public class ResponseDeserializer extends StdDeserializer<ExchangeResponse> {

	public ResponseDeserializer() {
		this(ExchangeResponse.class);
	}

	protected ResponseDeserializer(Class<?> vc) {
		super(vc);
	}

	@Override
	public ExchangeResponse deserialize(JsonParser p, DeserializationContext ctxt)
			throws IOException
	{
		TreeNode tn = p.readValueAsTree();

		if(tn.get("result") != null) {
			return new ExchangeResponse(Double.parseDouble(tn.get("result").toString()));
		}
		else return new ExchangeResponse(-1.0D);
	}
}
