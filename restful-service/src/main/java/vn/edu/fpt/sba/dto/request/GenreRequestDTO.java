package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GenreRequestDTO(
        @NotBlank(message = "Name is required")
        @Size(min = 3, message = "Name must be at least 3 letters")
        String name
) {
}
