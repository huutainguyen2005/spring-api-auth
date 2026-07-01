package vn.edu.fpt.sba.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record GenreResponseDTO(
        Long genreId,
        String name,
        String description,
        BigDecimal popularityScore,
        Boolean isActive,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
