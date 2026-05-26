package vn.edu.fpt.sba.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Value("${springdoc.api-docs.path}")
    private String apiDocsPath;

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("SBA RESTful Service API")
                        .version("1.0")
                        .description("API documentation for the SBA RESTful Service")
                        .termsOfService("https://fptu.edu.vn/terms")
                        .contact(new Contact()
                                .name("Support Team")
                                .email("dev@fptu.edu.vn")
                                .url("https://fptu.edu.vn/support")
                        )
                );
    }
}