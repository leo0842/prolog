package wooteco.prolog.image.ui;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/image")
public class ImageController {

    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestPart MultipartFile image) {
        return ResponseEntity.ok("imageUrl");
    }
}
