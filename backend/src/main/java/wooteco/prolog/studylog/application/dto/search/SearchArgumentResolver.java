package wooteco.prolog.studylog.application.dto.search;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.core.MethodParameter;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import wooteco.prolog.studylog.exception.SearchArgumentParseException;

@Component
public class SearchArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(SearchParams.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

        try {
            return new StudylogsSearchRequest(
                webRequest.getParameter("keyword"),
                convertToLongList(webRequest, "levels"),
                convertToLongList(webRequest, "missions"),
                convertToLongList(webRequest, "tags"),
                convertToStringList(webRequest, "usernames"),
                convertToLocalDate(webRequest, "startDate"),
                convertToLocalDate(webRequest, "endDate"),
                makePageableDefault(webRequest)
            );
        } catch (Exception e) {
            throw new SearchArgumentParseException();
        }
    }

    private LocalDate convertToLocalDate(NativeWebRequest webRequest, String key) {
        String date = webRequest.getParameter(key);

        if (Objects.isNull(date)) {
            return null;
        }

        return LocalDate.parse(date, DateTimeFormatter.BASIC_ISO_DATE);
    }

    private Integer convertToInt(NativeWebRequest webRequest, String key, int defaultValue) {
        String value = webRequest.getParameter(key);
        if (value == null) {
            return defaultValue;
        }
        return Integer.parseInt(value);
    }

    private List<Long> convertToLongList(NativeWebRequest webRequest, String key) {
        String[] parameterValues = webRequest.getParameterValues(key);
        if (parameterValues == null || parameterValues.length == 0) {
            return Collections.emptyList();
        }
        return Arrays.stream(parameterValues)
            .map(Long::parseLong)
            .collect(Collectors.toList());
    }

    private List<String> convertToStringList(NativeWebRequest webRequest, String key) {
        String[] parameterValues = webRequest.getParameterValues(key);
        if (parameterValues == null || parameterValues.length == 0) {
            return Collections.emptyList();
        }

        return Arrays.stream(Objects.requireNonNull(webRequest.getParameterValues(key)))
            .collect(Collectors.toList());
    }

    private Pageable makePageableDefault(NativeWebRequest webRequest) {
        int page = convertToInt(webRequest, "page", 1) - 1;
        int size = convertToInt(webRequest, "size", 10);
        return PageRequest.of(
            page,
            size,
            Direction.DESC,
            "id");
    }
}
