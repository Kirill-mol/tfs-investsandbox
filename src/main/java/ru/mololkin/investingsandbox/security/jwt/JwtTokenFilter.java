package ru.mololkin.investingsandbox.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import ru.mololkin.investingsandbox.dto.response.ErrorResponse;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtTokenFilter extends GenericFilterBean {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper mapper;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.mapper = new ObjectMapper();
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        response.setStatus(200);

        String token = jwtTokenProvider.resolveToken(request); // Достаем токен из запроса
        try {
            if (token != null && jwtTokenProvider.validateToken(token)) { // Проверяем и валидируем токен
                Authentication authentication = jwtTokenProvider.getAuth(token); //  Передаем права
                if (authentication != null) {
                    SecurityContextHolder.getContext().setAuthentication(authentication); // Передаем аутентификатор
                }
            }
        } catch (JwtAuthException e) {
            if (!response.isCommitted()) {
                SecurityContextHolder.clearContext();
                response.resetBuffer();
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setHeader("Content-Type", "application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().print(mapper.writeValueAsString(new ErrorResponse(
                        "Jwt token is expired or invalid",
                        HttpStatus.UNAUTHORIZED,
                        request.getServletPath()
                )));
                //отправка ошибки
                response.flushBuffer();
            }
        }
        // Если нет ошибок отправляем данные дальше по цепочке
        chain.doFilter(req, res);
    }
}
