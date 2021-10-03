package wooteco.prolog.report.application.report;

import static java.util.stream.Collectors.toList;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.testcontainers.shaded.org.apache.commons.lang.StringUtils;
import wooteco.prolog.report.application.dto.report.ReportAssembler;
import wooteco.prolog.report.domain.report.repository.ReportRepository;

@Component
public class SimpleReportsRequestType implements ReportsRequestType {

    private static final String TYPE = "simple";

    private final ReportRepository reportRepository;
    private final ReportAssembler reportAssembler;

    public SimpleReportsRequestType(
        ReportRepository reportRepository,
        ReportAssembler reportAssembler
    ) {
        this.reportRepository = reportRepository;
        this.reportAssembler = reportAssembler;
    }

    @Override
    public boolean isSupport(String type) {
        return StringUtils.equalsIgnoreCase(type, TYPE);
    }

    @Override
    public Object execute(String username, Pageable pageable) {
        return reportRepository.findReportsByUsername(username, pageable).stream()
            .map(reportAssembler::simpleOf)
            .collect(toList());
    }
}