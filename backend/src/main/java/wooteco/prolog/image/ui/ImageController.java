package wooteco.prolog.image.ui;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import wooteco.prolog.image.application.dto.ImageResponse;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {


    @PostMapping
    public ResponseEntity<ImageResponse> uploadImage(@RequestPart MultipartFile image) throws IOException {
        return ResponseEntity.ok(new ImageResponse("imageUrl"));
    }

}
