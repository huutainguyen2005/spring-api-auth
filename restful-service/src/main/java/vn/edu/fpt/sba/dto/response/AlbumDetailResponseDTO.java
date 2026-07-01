package vn.edu.fpt.sba.dto.response;

public record AlbumDetailResponseDTO(
        Integer albumId,
        String title,
        ArtistResponseDTO artist) {

}
