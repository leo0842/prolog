package wooteco.prolog.image.ui;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import wooteco.prolog.image.application.ImageService;
import wooteco.prolog.image.application.dto.ImageResponse;
import wooteco.prolog.image.domain.Image;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
public class ImageController {

    @PostMapping
    public ResponseEntity<ImageResponse> uploadImage(@RequestPart MultipartFile image) throws IOException {
        return ResponseEntity.ok(new ImageResponse("https://dmaxaug2ve9od.cloudfront.net/promotion_banner/jujeol-promotion-cheers.png"));
    }
}
