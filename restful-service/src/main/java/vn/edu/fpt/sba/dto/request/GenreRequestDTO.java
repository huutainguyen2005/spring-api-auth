package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record GenreRequestDTO(
        @NotBlank(message = "Name is required")
        @Size(min = 3, message = "Name must be at least 3 letters")
        String name,
//        @Size(max = 500, message = "Description cannot exceed 500 characters")
        String description,
        @NotNull(message = "Popularity score is required")
        BigDecimal popularityScore,
        Boolean isActive
) {
}
