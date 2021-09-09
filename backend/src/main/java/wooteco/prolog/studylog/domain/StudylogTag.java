package wooteco.prolog.studylog.domain;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "post_tag")
public class StudylogTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private wooteco.prolog.studylog.domain.Studylog studylog;

    public StudylogTag(wooteco.prolog.studylog.domain.Studylog studylog, Tag tag) {
        this(null, studylog, tag);
    }

    public StudylogTag(Long id, wooteco.prolog.studylog.domain.Studylog studylog, Tag tag) {
        this.id = id;
        this.studylog = studylog;
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudylogTag)) {
            return false;
        }
        StudylogTag studylogTag = (StudylogTag) o;
        return Objects.equals(id, studylogTag.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}