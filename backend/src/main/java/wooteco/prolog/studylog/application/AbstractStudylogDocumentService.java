package wooteco.prolog.studylog.application;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import wooteco.prolog.studylog.application.dto.ElasticHealthResponse;
import wooteco.prolog.studylog.domain.Studylog;
import wooteco.prolog.studylog.domain.StudyLogDocument;
import wooteco.prolog.studylog.domain.repository.StudyLogDocumentRepository;
import wooteco.prolog.studylog.domain.repository.StudylogRepository;
import wooteco.prolog.studylog.exception.StudylogDocumentNotFoundException;
import wooteco.prolog.studylog.infrastructure.HealthCheckClient;
import wooteco.prolog.studylog.application.dto.ClusterHealthResponses;
import wooteco.prolog.studylog.application.dto.IndexHealthResponses;

public abstract class AbstractStudylogDocumentService implements DocumentService {

    private static final String EMPTY = " ";

    protected final StudyLogDocumentRepository studylogDocumentRepository;
    protected final StudylogRepository studylogRepository;
    private final HealthCheckClient healthCheckClient;

    public AbstractStudylogDocumentService(StudyLogDocumentRepository studylogDocumentRepository,
                                           StudylogRepository studylogRepository,
                                           HealthCheckClient healthCheckClient) {
        this.studylogDocumentRepository = studylogDocumentRepository;
        this.studylogRepository = studylogRepository;
        this.healthCheckClient = healthCheckClient;
    }

    @Override
    public void save(StudyLogDocument studylogDocument) {
        studylogDocumentRepository.save(studylogDocument);
    }

    @Override
    public StudyLogDocument findById(Long id) {
        return studylogDocumentRepository.findById(id)
            .orElseThrow(StudylogDocumentNotFoundException::new);
    }

    @Override
    public void delete(StudyLogDocument studylogDocument) {
        studylogDocumentRepository.delete(studylogDocument);
    }

    @Override
    public void deleteAll() {
        studylogDocumentRepository.deleteAll();
    }

    @Override
    public void sync() {
        // sync between es and db
        studylogDocumentRepository.deleteAll();

        List<Studylog> studylogs = studylogRepository.findAll();
        studylogDocumentRepository.saveAll(
            studylogs.stream()
                .map(Studylog::toStudylogDocument)
                .collect(Collectors.toList())
        );
    }

    @Override
    public void update(StudyLogDocument studylogDocument) {
        studylogDocumentRepository.save(studylogDocument);
    }

    protected List<String> preprocess(String searchKeyword) {
        String[] split = searchKeyword.split(EMPTY);
        List<String> results = new ArrayList<>();
        Collections.addAll(results, split);
        if (split.length == 1) {
            return results;
        }
        results.add(searchKeyword); // 기존 검색어도 리스트에 포함한다.
        return results;
    }

    @Override
    public ElasticHealthResponse checkHealth() {
        return healthCheckClient.healthCheck("studylog-document");
    }

    @Override
    public ClusterHealthResponses checkHealthOfCluster() {
        return healthCheckClient.healthOfCluster();
    }

    @Override
    public IndexHealthResponses checkHealthOfIndex() {
        return healthCheckClient.healthOfIndex("studylog-document");
    }
}

