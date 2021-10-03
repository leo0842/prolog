package wooteco.prolog.login.ui;

import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import wooteco.prolog.login.application.AuthorizationExtractor;
import wooteco.prolog.login.application.JwtTokenProvider;
import wooteco.prolog.login.domain.AuthMemberPrincipal;
import wooteco.prolog.login.excetpion.TokenNotValidException;
import wooteco.prolog.login.ui.LoginMember.Authority;
import wooteco.prolog.member.domain.Member;

@AllArgsConstructor
@Component
public class AuthMemberPrincipalArgumentResolver implements HandlerMethodArgumentResolver {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthMemberPrincipal.class);
    }

    @Override
    public LoginMember resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String credentials = AuthorizationExtractor
            .extract(webRequest.getNativeRequest(HttpServletRequest.class));

        if (credentials == null || credentials.isEmpty()) {
            return new LoginMember(Authority.ANONYMOUS);
        }

        try {
            Long id = Long.parseLong(jwtTokenProvider.extractSubject(credentials));
            return new LoginMember(id, Authority.MEMBER);
        } catch (NumberFormatException e) {
            throw new TokenNotValidException();
        }

    }
}
