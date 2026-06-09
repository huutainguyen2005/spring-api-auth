package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.configuration.GenericConfig;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.GenreResponseDTO;
import vn.edu.fpt.sba.dto.response.PageResponseDTO;
import vn.edu.fpt.sba.entity.Genre;
import vn.edu.fpt.sba.exception.ApiError;
import vn.edu.fpt.sba.service.IGenreService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/genres")
@RequiredArgsConstructor
@Tag(name = "Genre APIs", description = "APIs for managing genres")
public class GenreController {

    private final IGenreService genreService;

    @GetMapping
    @Operation(summary = "Get genre list", description = "This API will return a genre list")
    @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = GenreResponseDTO.class)
            )
    )
    public PageResponseDTO<GenreResponseDTO> getAllGenres(@ParameterObject @PageableDefault(size = 10) Pageable pageable) {
        Page<GenreResponseDTO> pageRes = genreService.getAllGenres(pageable);
        return PageResponseDTO.of(pageRes);

    }

    @Operation(summary = "Get genre by ID", description = "This API will return a genre by its ID")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = GenreResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Genre not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    )
            )
    })
    @GetMapping("/{genreId}")
    public GenreResponseDTO getGenreById(@PathVariable Long genreId) {
        return  genreService.findById(genreId);
    }

    @Operation(summary = "Create genre", description = "This API will create a new genre")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public GenreResponseDTO createGenre(@RequestBody Genre genre) {
        return genreService.save(genre);
    }

    @Operation(summary = "Update genre", description = "This API will update a genre by its ID")
    @PutMapping("/{genreId}")
    public ResponseEntity<GenreResponseDTO> updateGenre(@PathVariable Long genreId,
                                                        @RequestBody Genre genre) {
        GenreResponseDTO updatedGenre = genreService.update(genreId, genre);

        if (updatedGenre == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedGenre);
    }

    @Operation(summary = "Delete genre", description = "This API will delete a genre by its ID")
    @DeleteMapping("/{genreId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteGenre(@PathVariable Long genreId) {
        genreService.delete(genreId);
        return ResponseEntity.noContent().build();
    }
}
