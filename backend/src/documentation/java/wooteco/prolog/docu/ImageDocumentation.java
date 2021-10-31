package wooteco.prolog.docu;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.io.File;
import java.io.IOException;
import org.junit.jupiter.api.Test;
import org.springframework.core.io.ClassPathResource;
import wooteco.prolog.Documentation;

public class ImageDocumentation extends Documentation {

    @Test
    void 이미지를_삽입한다() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("static/wedge_image.png");
        File pngFile = classPathResource.getFile();

        ExtractableResponse<Response> extract = given("image/insert")
            .header("Authorization", "Bearer " + 로그인_사용자.getAccessToken())
            .multiPart("image", pngFile)
            .when().post("/image")
            .then().log().all()
            .extract();

        assertThat(extract.statusCode()).isEqualTo(200);
        assertThat(extract.body().asString()).isEqualTo("imageUrl");
    }
}
