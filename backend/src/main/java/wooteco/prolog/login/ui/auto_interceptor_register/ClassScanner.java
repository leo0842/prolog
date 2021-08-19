package wooteco.prolog.login.ui.auto_interceptor_register;

import org.reflections.Reflections;
import org.reflections.scanners.SubTypesScanner;

import java.util.HashSet;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

public class ClassScanner {

    private final String basePackage;

    public ClassScanner(String basePackage) {
        this.basePackage = basePackage;
    }

    public Set<Class<?>> getAllClasses() {
        Reflections reflections = new Reflections(
            basePackage,
            new SubTypesScanner(false)
        );

        return new HashSet<>(reflections.getSubTypesOf(Object.class));
    }
}
