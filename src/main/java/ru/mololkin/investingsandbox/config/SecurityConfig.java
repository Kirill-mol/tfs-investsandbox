package ru.mololkin.investingsandbox.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.mololkin.investingsandbox.exception.handler.CustomAccessDeniedHandler;
import ru.mololkin.investingsandbox.exception.handler.CustomAuthEntryPoint;
import ru.mololkin.investingsandbox.security.jwt.JwtConfigurer;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenFilter;
import ru.mololkin.investingsandbox.security.jwt.JwtTokenProvider;

import java.util.Arrays;
import java.util.Collections;

@EnableWebMvc
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {
	private final JwtConfigurer jwtConfigurer;

	private static final String ADMIN_ENDPOINT = "admin/**";
	private static final String LOGIN_ENDPOINT = "/auth/login";
	private static final String REGISTER_ENDPOINT = "/register";
	private static final String ACTUATOR_ENDPOINT = "/actuator/**";


	@Bean
	@Override
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
				.httpBasic().disable()
				.csrf().disable()
				.cors().disable()
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				.and()
					.authorizeRequests()
					.antMatchers(ACTUATOR_ENDPOINT, "/").permitAll()
					.antMatchers(LOGIN_ENDPOINT, REGISTER_ENDPOINT).permitAll()
					.antMatchers(ADMIN_ENDPOINT).hasRole("ADMIN")
					.anyRequest().authenticated()
				.and()
					.exceptionHandling()
					.authenticationEntryPoint(authenticationEntryPoint())
					.accessDeniedHandler(accessDeniedHandler())
				.and()
					.apply(jwtConfigurer);

	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	@ConditionalOnMissingBean(JwtConfigurer.class)
	public JwtConfigurer jwtConfigurer(JwtTokenFilter jwtTokenFilter) {
		return new JwtConfigurer(jwtTokenFilter);
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
				.addMapping("/**")
				.allowedMethods("*");
	}

	@Bean
	public AuthenticationEntryPoint authenticationEntryPoint() {
		return new CustomAuthEntryPoint();
	}

	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
	}
}
