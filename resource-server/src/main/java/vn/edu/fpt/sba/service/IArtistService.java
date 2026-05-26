package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistResponseDTO;
import vn.edu.fpt.sba.entity.Artist;

import java.util.List;

public interface IArtistService {

    Page<ArtistDetailResponseDTO> findAll(Pageable pageable);

    ArtistDetailResponseDTO findById(Long artistId);

    ArtistResponseDTO save(Artist artist);

    ArtistResponseDTO update(Long artistId, Artist artist);

    void delete(Long artistId);
}
