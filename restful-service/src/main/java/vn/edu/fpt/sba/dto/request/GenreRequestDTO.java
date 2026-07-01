package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record GenreRequestDTO(
        @NotBlank(message = "Name is required")
        @Size(min = 3, message = "Name must be at least 3 letters")
        String name,

        @Size(max = 100, message = "Description cannot exceed 100 characters")
        String description,

        @NotNull(message = "Popularity score is required")
        @DecimalMin(value = "0.0", message = "Popularity score must be at least 0")
        @DecimalMax(value = "99.99", message = "Popularity score must not exceed 99.99")
        BigDecimal popularityScore,

        Boolean isActive
) {
}
