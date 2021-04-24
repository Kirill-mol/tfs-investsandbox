package ru.mololkin.investingsandbox.propertiy;

import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;
import org.springframework.lang.NonNull;

@Getter
@ConstructorBinding
@ConfigurationProperties(prefix = "jwt.token")
public class JwtProperties {
	@NonNull
	private final String secret;

	private final Long expiration;

	public JwtProperties(@NonNull String secret,
	                     Long expiration
	){
		this.secret = secret;
		this.expiration = expiration;
	}
}
