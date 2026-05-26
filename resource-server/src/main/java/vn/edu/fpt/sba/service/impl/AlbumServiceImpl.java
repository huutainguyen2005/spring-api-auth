package vn.edu.fpt.sba.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.dto.request.AlbumRequestDTO;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.AlbumResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistResponseDTO;
import vn.edu.fpt.sba.entity.Album;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.repository.AlbumRepository;
import vn.edu.fpt.sba.repository.ArtistRepository;
import vn.edu.fpt.sba.service.IAlbumService;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements IAlbumService {

    private final AlbumRepository albumRepository;
    private final ArtistRepository artistRepository;

    @Override
    public Page<AlbumDetailResponseDTO> getAllAlbums(Pageable pageable) {
        return albumRepository.findAll(pageable)
                .map(this::toDetailResponseDTO);
    }

    @Override
    public AlbumDetailResponseDTO findById(Long albumId) {
        Album album = albumRepository.findById(albumId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Album not found with id: " + albumId
                        )
                );

        return toDetailResponseDTO(album);

    }

    @Override
    public AlbumDetailResponseDTO save(AlbumRequestDTO albumRequestDTO) {

        Artist artist = artistRepository
                .findById(albumRequestDTO.artistId())
                .orElse(null);

        Album album = new Album();

        album.setTitle(albumRequestDTO.title());
        album.setArtist(artist);

        Album savedAlbum = albumRepository.save(album);

        return toDetailResponseDTO(savedAlbum);
    }

    @Override
    public AlbumDetailResponseDTO update(Long albumId, Album albumInput) {

        return albumRepository.findById(albumId)
                .map(found -> {

                    found.setTitle(albumInput.getTitle());

                    if (albumInput.getArtist() != null) {

                        Long artistId = albumInput.getArtist().getArtistId();

                        Artist artist = artistRepository.findById(artistId)
                                .orElse(null);

                        found.setArtist(artist);
                    }

                    Album updatedAlbum = albumRepository.save(found);

                    return toDetailResponseDTO(updatedAlbum);
                })
                .orElse(null);
    }

    @Override
    public void delete(Long albumId) {
        albumRepository.deleteById(albumId);
    }

    private AlbumResponseDTO toResponseDTO(Album album) {
        return new AlbumResponseDTO(
                album.getAlbumId(),
                album.getTitle()
        );
    }

    private AlbumDetailResponseDTO toDetailResponseDTO(Album album) {

        ArtistResponseDTO artistDTO = new ArtistResponseDTO(
                album.getArtist().getArtistId(),
                album.getArtist().getName()
        );

        return new AlbumDetailResponseDTO(
                album.getAlbumId(),
                album.getTitle(),
                artistDTO
        );
    }
}
