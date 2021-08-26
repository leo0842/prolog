package wooteco.prolog.studylog.application;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import wooteco.prolog.studylog.application.dto.LevelRequest;
import wooteco.prolog.studylog.application.dto.LevelResponse;
import wooteco.prolog.studylog.domain.Level;
import wooteco.prolog.studylog.domain.repository.LevelRepository;
import wooteco.prolog.studylog.exception.DuplicateLevelException;
import wooteco.prolog.studylog.exception.LevelNotFoundException;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@AllArgsConstructor
@Transactional(readOnly = true)
public class LevelService {

    private LevelRepository levelRepository;


    @Transactional
    public LevelResponse create(LevelRequest levelRequest) {
        validateName(levelRequest.getName());

        return LevelResponse.of(levelRepository.save(levelRequest.toEntity()));
    }

    private void validateName(String name) {
        if (levelRepository.findByName(name).isPresent()) {
            throw new DuplicateLevelException();
        }
    }

    public Level findById(Long id) {
        return levelRepository.findById(id)
                .orElseThrow(LevelNotFoundException::new);
    }

    public List<LevelResponse> findAll() {
        return levelRepository.findAll().stream()
                .map(LevelResponse::of)
                .collect(toList());
    }

    public List<Level> findByIds(List<Long> levelIds) {
        return levelRepository.findAllById(levelIds);
    }
}