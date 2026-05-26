package vn.edu.fpt.sba.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.dto.response.AlbumResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistResponseDTO;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.repository.ArtistRepository;
import vn.edu.fpt.sba.service.IArtistService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ArtistServiceImpl implements IArtistService {

    private final ArtistRepository artistRepository;

    // Phan trang Artist
    @Override
    public Page<ArtistDetailResponseDTO> findAll(Pageable pageable) {
        return artistRepository.findAll(pageable).map(this::toDetailResponseDTO);
    }

    @Override
    public ArtistDetailResponseDTO findById(Long artistId) {
        Artist artist = artistRepository.findById(artistId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Artist not found with id: " + artistId
                        )
                );

        return toDetailResponseDTO(artist);
    }

    @Override
    public ArtistResponseDTO save(Artist artist) {

        Artist savedArtist = artistRepository.save(artist);

        return toResponseDTO(savedArtist);
    }

    @Override
    public ArtistResponseDTO update(Long artistId, Artist artistInput) {

        return artistRepository.findById(artistId)
                .map(found -> {

                    found.setName(artistInput.getName());

                    Artist updatedArtist = artistRepository.save(found);

                    return toResponseDTO(updatedArtist);
                })
                .orElse(null);
    }

    @Override
    public void delete(Long artistId) {
        artistRepository.deleteById(artistId);
    }

    private ArtistResponseDTO toResponseDTO(Artist artist) {

        return new ArtistResponseDTO(
                artist.getArtistId(),
                artist.getName()
        );
    }

    private ArtistDetailResponseDTO toDetailResponseDTO(Artist artist) {
        List<AlbumResponseDTO> albumDTO = artist.getAlbums().stream().map(
                album -> new AlbumResponseDTO(album.getAlbumId(), album.getTitle())
        ).toList();
        return new ArtistDetailResponseDTO(artist.getArtistId(), artist.getName(), albumDTO);
    }

}
