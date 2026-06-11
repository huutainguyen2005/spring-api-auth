package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.request.AlbumRequestDTO;
import vn.edu.fpt.sba.dto.response.AlbumDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.AlbumResponseDTO;
import vn.edu.fpt.sba.entity.Album;
import vn.edu.fpt.sba.entity.Artist;

import java.util.List;

public interface IAlbumService {

    Page<AlbumDetailResponseDTO> getAllAlbums(Pageable pageable);

    AlbumDetailResponseDTO findById(Long albumId);

    AlbumDetailResponseDTO save(AlbumRequestDTO albumRequestDTO);

    AlbumDetailResponseDTO update(Long albumId, AlbumRequestDTO request);

    void delete(Long artistId);
}
