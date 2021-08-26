package wooteco.prolog.studylog.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import wooteco.prolog.studylog.domain.Level;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class LevelResponse {

    private Long id;
    private String name;

    public static LevelResponse of(Level level) {
        return new LevelResponse(level.getId(), level.getName());
    }
}