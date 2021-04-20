package ru.mololkin.investingsandbox;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan(basePackages = {"ru.mololkin.investingsandbox.*"})
public class InvestingSandboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(InvestingSandboxApplication.class, args);
	}

}

