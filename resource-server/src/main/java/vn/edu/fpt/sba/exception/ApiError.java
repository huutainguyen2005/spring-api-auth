package vn.edu.fpt.sba.exception;

import java.time.LocalDateTime;

public record ApiError(LocalDateTime timestamp,
                       int status,
                       String message,
                       String error) {
}
