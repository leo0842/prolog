package wooteco.prolog.post.dao;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.jdbc.core.JdbcTemplate;
import wooteco.prolog.post.domain.Post;
import wooteco.prolog.tag.domain.Tag;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@JdbcTest
class PostDaoTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    private PostDao postDao;

    public static final Post FIRST_POST = new Post("이것은 제목", "피케이와 포모의 포스트", 1L, Arrays.asList(new Tag("자바"), new Tag("스프링")));
    public static final Post SECOND_POST = new Post("이것은 두번째 제목", "피케이와 포모의 포스트 2", 1L, Arrays.asList(new Tag("자바"), new Tag("스프링")));
    public static final Post THIRD_POST = new Post("이것은 3 제목", "피케이 포스트", 1L, Arrays.asList(new Tag("자바"), new Tag("스프링")));
    public static final Post FOURTH_POST = new Post("이것은 네번 제목", "포모의 포스트", 1L, Arrays.asList(new Tag("자바"), new Tag("스프링")));

    @BeforeEach
    void setUp() {
        postDao = new PostDao(jdbcTemplate);
    }

    @Test
    void 포스트를_저장하는_테스트() {
        // given
        // when
        Post expected = 포스트를_저장한다(FIRST_POST);

        // then
        assertThat(expected.getId()).isNotNull();
    }

    private Post 포스트를_저장한다(Post post) {
        return postDao.insert(post);
    }

    @Test
    void 다수의_포스트를_저장하는_테스트() {
        // given
        List<Post> expectedPosts = Arrays.asList(FIRST_POST, SECOND_POST, THIRD_POST, FOURTH_POST);
        // when
        postDao.insert(expectedPosts);

        //then
        List<Post> results = postDao.findAll();

        for (int i = 0; i < results.size(); i++) {
            Post result = results.get(i);
            Post expectedPost = expectedPosts.get(i);

            assertThat(result.getContent()).isEqualTo(expectedPost.getContent());
            assertThat(result.getTitle()).isEqualTo(expectedPost.getTitle());
        }
    }

    @Test
    void 개별_포스트를_불러온다() {
        // given
        Post post = 포스트를_저장한다(SECOND_POST);

        // when
        Post foundPost = postDao.findById(post.getId());

        // then
        assertThat(foundPost.getId()).isEqualTo(post.getId());
        assertThat(foundPost.getContent()).isEqualTo(SECOND_POST.getContent());
        assertThat(foundPost.getTitle()).isEqualTo(SECOND_POST.getTitle());
    }

    @Test
    void 모든_포스트를_불러온다() {
        // given
        Post 첫번째_포스트 = 포스트를_저장한다(THIRD_POST);
        Post 두번째_포스트 = 포스트를_저장한다(FOURTH_POST);

        // when
        List<Post> posts = postDao.findAll();

        // then
        assertThat(posts).contains(첫번째_포스트, 두번째_포스트);
    }
}