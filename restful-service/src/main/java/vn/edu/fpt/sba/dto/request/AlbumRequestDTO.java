package vn.edu.fpt.sba.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AlbumRequestDTO(
        @NotBlank(message = "Title is required")
        @Size(min = 10, message = "Title must be ...")
        String title,

        @NotNull(message = "Artist ID is required")
        Long artistId) {

}
