package ru.mololkin.investingsandbox.exception.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import ru.mololkin.investingsandbox.exception.dto.BaseExceptionResponseDto;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Kirill Mololkin kir.mololkin@yandex.ru 24.04.2021
 */
public class CustomAccessDeniedHandler implements AccessDeniedHandler {
	@Override
	public void handle(HttpServletRequest request,
	                   HttpServletResponse response,
	                   AccessDeniedException accessDeniedException
	) throws IOException {
		ObjectMapper mapper = new ObjectMapper();
		response.setContentType("application/json;charset=UTF-8");
		response.setStatus(403);
		response.getWriter().write(mapper.writeValueAsString(
				new BaseExceptionResponseDto("Access denied", HttpStatus.FORBIDDEN)));
	}
}
