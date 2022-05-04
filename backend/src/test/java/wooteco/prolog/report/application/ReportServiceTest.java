package wooteco.prolog.report.application;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import wooteco.prolog.report.domain.Report;
import wooteco.prolog.report.domain.repository.ReportRepository;

@SpringBootTest
class ReportServiceTest {

    @Autowired
    private ReportService reportService;

    @Mock
    private ReportRepository reportRepository;

    @Test
    void findAllReports() {

        Report report = new Report("title", "desc", 1L, LocalDate.of(2022, 3, 5),
            LocalDate.of(2022, 3, 6));
        Report report2 = new Report("title", "desc", 1L, LocalDate.of(2022, 3, 6),
            LocalDate.of(2022, 3, 7));
        Pageable pageable = PageRequest.of(1, 10, Sort.Direction.DESC, "startDate");
        reportService.getAllReports(pageable);
    }
}