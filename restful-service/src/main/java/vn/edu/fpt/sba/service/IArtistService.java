package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistResponseDTO;
import vn.edu.fpt.sba.entity.Artist;

import java.util.List;

public interface IArtistService {

    Page<ArtistDetailResponseDTO> findAll(Pageable pageable);

    ArtistDetailResponseDTO findById(Integer artistId);

    ArtistResponseDTO save(Artist artist);

    ArtistResponseDTO update(Integer artistId, Artist artist);

    void delete(Integer artistId);
}
