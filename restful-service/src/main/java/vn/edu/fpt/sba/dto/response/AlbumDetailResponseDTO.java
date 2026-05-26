package vn.edu.fpt.sba.dto.response;

public record AlbumDetailResponseDTO(
        Long albumId,
        String title,
        ArtistResponseDTO artist) {

}
