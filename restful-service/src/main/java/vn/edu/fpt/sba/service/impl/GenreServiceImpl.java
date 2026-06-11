package vn.edu.fpt.sba.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vn.edu.fpt.sba.dto.response.GenreResponseDTO;
import vn.edu.fpt.sba.entity.Genre;
import vn.edu.fpt.sba.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.repository.GenreRepository;
import vn.edu.fpt.sba.service.IGenreService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements IGenreService {

    private final GenreRepository genreRepository;

    @Override
    public List<GenreResponseDTO> findAll() {
        return genreRepository.findAll().stream().map(this::toResponseDTO).toList();
    }

    // Phan trang Genre
    @Override
    public Page<GenreResponseDTO> getAllGenres(Pageable pageable) {
        return genreRepository.findAll(pageable).map(this::toResponseDTO);
    }

    @Override
    public GenreResponseDTO findById(Long genreId) {

        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Genre not found with id: " + genreId
                        )
                );

        return toResponseDTO(genre);
    }

    @Override
    public GenreResponseDTO save(Genre genre) {
        Genre savedGenre = genreRepository.save(genre);
        return toResponseDTO(savedGenre);
    }

    @Override
    public GenreResponseDTO update(Long genreId, Genre genreInput) {

        Genre genre = genreRepository.findById(genreId)
                .orElseThrow(() -> new ResourceNotFoundException("Genre not found with ID: " + genreId));

        genre.setName(genreInput.getName());
        Genre updatedGenre = genreRepository.save(genre);

        return toResponseDTO(updatedGenre);
    }

    @Override
    public void delete(Long genreId) {
        genreRepository.deleteById(genreId);
    }

    private GenreResponseDTO toResponseDTO(Genre genre) {
        return new GenreResponseDTO(
                genre.getGenreId(),
                genre.getName()
        );
    }
}
