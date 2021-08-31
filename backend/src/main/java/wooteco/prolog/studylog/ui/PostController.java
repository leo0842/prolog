package wooteco.prolog.studylog.ui;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import wooteco.prolog.login.domain.AuthMemberPrincipal;
import wooteco.prolog.member.domain.Member;
import wooteco.prolog.studylog.application.PostService;
import wooteco.prolog.studylog.application.dto.PostRequest;
import wooteco.prolog.studylog.application.dto.PostResponse;
import wooteco.prolog.studylog.application.dto.PostsResponse;
import wooteco.prolog.studylog.exception.PostNotFoundException;
import wooteco.prolog.studylog.infrastructure.NumberUtils;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<Void> createPost(@AuthMemberPrincipal Member member,
                                           @RequestBody List<PostRequest> postRequests) {
        List<PostResponse> postResponse = postService.insertPosts(member, postRequests);
        return ResponseEntity.created(URI.create("/posts/" + postResponse.get(0).getId())).build();
    }

    @GetMapping
    public ResponseEntity<PostsResponse> showAll(
            @RequestParam(required = false) List<Long> levels,
            @RequestParam(required = false) List<Long> missions,
            @RequestParam(required = false) List<Long> tags,
            @RequestParam(required = false) List<String> usernames,
            @PageableDefault(size = 20, direction = Direction.DESC, sort = "id") Pageable pageable
    ) {
        PostsResponse postsResponse = postService.findPostsWithFilter(levels, missions, tags, usernames, pageable);
        return ResponseEntity.ok(postsResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> showPost(@PathVariable String id) {
        if (!NumberUtils.isNumeric(id)) {
            throw new PostNotFoundException();
        }
        PostResponse postResponse = postService.findById(Long.parseLong(id));
        return ResponseEntity.ok(postResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updatePost(
            @AuthMemberPrincipal Member member,
            @PathVariable Long id,
            @RequestBody PostRequest postRequest
    ) {
        postService.updatePost(member, id, postRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@AuthMemberPrincipal Member member,
                                           @PathVariable Long id) {
        postService.deletePost(member, id);
        return ResponseEntity.noContent().build();
    }
}