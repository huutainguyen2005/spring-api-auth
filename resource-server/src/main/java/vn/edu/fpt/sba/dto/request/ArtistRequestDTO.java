package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;

public record ArtistRequestDTO(
        @NotBlank(message = "Name is required")
        @Size(min = 3, message = "Name must be at least 3 letters")
        String name) {

}
