package vn.edu.fpt.sba.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.fpt.sba.dto.request.GenreRequestDTO;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistResponseDTO;
import vn.edu.fpt.sba.dto.response.GenreResponseDTO;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.entity.Genre;

import java.util.List;

public interface IGenreService {

    List<GenreResponseDTO> findAll();

    Page<GenreResponseDTO> getAllGenres(Pageable pageable);

    GenreResponseDTO findById(Long genreId);

    GenreResponseDTO save(Genre genre);

    GenreResponseDTO update(Long genreId, GenreRequestDTO genreRequestDTO);

    void delete(Long genreId);
}
