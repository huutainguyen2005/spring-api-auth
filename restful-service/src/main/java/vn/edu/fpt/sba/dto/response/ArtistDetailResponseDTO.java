package vn.edu.fpt.sba.dto.response;

import java.util.List;

public record ArtistDetailResponseDTO(
        Integer artistId,
        String name,
        List<AlbumResponseDTO> albums)
{
}
