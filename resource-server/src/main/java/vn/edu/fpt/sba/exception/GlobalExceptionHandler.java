package vn.edu.fpt.sba.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
@ResponseBody
public class GlobalExceptionHandler {

//    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ResponseEntity<ApiError> handlerException(RuntimeException ex) {
//        ApiError json = new ApiError(LocalDateTime.now(),
//                HttpStatus.NOT_FOUND.value(),
//                ex.getMessage(),
//                "Not Found"
//                );
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(json);
//    }
}
