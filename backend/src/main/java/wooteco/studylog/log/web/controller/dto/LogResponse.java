package wooteco.studylog.log.web.controller.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

public class LogResponse {
    private Long id;
    private AuthorResponse author;
    private LocalDateTime issuedDate;
    private CategoryResponse category;
    private String title;
    private String content;
    private List<String> tags;


    public LogResponse() {
    }

    public LogResponse(Long id, AuthorResponse author, LocalDateTime issuedDate, CategoryResponse category, String title, String content, List<String> tags) {
        this.id = id;
        this.author = author;
        this.issuedDate = issuedDate;
        this.category = category;
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public AuthorResponse getAuthor() {
        return author;
    }

    public LocalDateTime getIssuedDate() {
        return issuedDate;
    }

    public CategoryResponse getCategory() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public List<String> getTags() {
        return tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LogResponse that = (LogResponse) o;
        return Objects.equals(id, that.id) && Objects.equals(author, that.author) && Objects.equals(category, that.category) && Objects.equals(title, that.title) && Objects.equals(content, that.content) && Objects.equals(tags, that.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, author, title, content, tags);
    }
}
