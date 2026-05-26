package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //meta-annotation -> @Controller + @ResponseBody\
@Tag(name = "Hello API", description = "APIs for saying hello")
public class HelloController {

    @GetMapping("/hello")
    // Response Body
    public String hello(){
        return "Hello SBA301";
    }
}
