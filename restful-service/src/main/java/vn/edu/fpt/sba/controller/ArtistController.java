package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import vn.edu.fpt.sba.configuration.GenericConfig;
import vn.edu.fpt.sba.dto.request.ArtistRequestDTO;
import vn.edu.fpt.sba.dto.response.ArtistDetailResponseDTO;
import vn.edu.fpt.sba.dto.response.ArtistResponseDTO;
import vn.edu.fpt.sba.dto.response.PageResponseDTO;
import vn.edu.fpt.sba.entity.Artist;
import vn.edu.fpt.sba.exception.ApiError;
import vn.edu.fpt.sba.exception.ExampleArtistException;
import vn.edu.fpt.sba.exception.ResourceNotFoundException;
import vn.edu.fpt.sba.service.IArtistService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/artists")
@RequiredArgsConstructor
@Tag(name = "Artist APIs", description = "APIs for managing artists")
public class ArtistController {

    private final IArtistService artistService;

//    @GetMapping
//    public List<ArtistResponseDTO> getAllArtists() {
//        return artistService.findAll();
//    }

    // Phan trang Artist
    @GetMapping
    @Operation(summary = "Get artist list", description = "This API will return an artist list")
    @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = ArtistDetailResponseDTO.class)
            )
    )
    public PageResponseDTO<ArtistDetailResponseDTO> getAllArtists(@ParameterObject @PageableDefault(size = 10) Pageable pageable){
        Page<ArtistDetailResponseDTO> pageRes = artistService.findAll(pageable);
        return PageResponseDTO.of(pageRes);

    }

    @GetMapping("/{artistId}")
    @Operation(summary = "Get artist by ID", description = "This API will return an artist by its ID")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ArtistDetailResponseDTO.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Artist not found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ApiError.class)
                    )
            )
    })
    public ArtistDetailResponseDTO findById(@PathVariable Long artistId) {

        ArtistDetailResponseDTO artistDetailResponseDTO = artistService.findById(artistId);

        if(artistDetailResponseDTO == null) {
            throw new ResourceNotFoundException("Artist not found");
        }

        return ResponseEntity.ok(artistDetailResponseDTO).getBody();
    }

    @PostMapping
    @Operation(summary = "Create artist", description = "This API will create an new artist")
    @ResponseStatus(HttpStatus.CREATED)
    public ArtistResponseDTO save(@Valid @RequestBody ArtistRequestDTO artistRequestDTO) {

        Artist artist = new Artist();
        artist.setName(artistRequestDTO.name());

        return artistService.save(artist);
    }

    @PutMapping("/{artistId}")
    @Operation(summary = "Update artist", description = "This API will update an artist by its ID")
    public ResponseEntity<ArtistResponseDTO> updateArtist(
            @PathVariable Long artistId,
            @RequestBody Artist artist) {

        ArtistResponseDTO updatedArtist =
                artistService.update(artistId, artist);

        if (updatedArtist == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedArtist);
    }

    @DeleteMapping("/{artistId}")
    @Operation(summary = "Delete artist", description = "This API will delete an artist by its ID")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteArtist(@PathVariable Long artistId) {
        artistService.delete(artistId);
        return ResponseEntity.noContent().build();
    }

//    @ExceptionHandler(RuntimeException.class)
//    @ResponseStatus(HttpStatus.NOT_FOUND)
//    public Map<String, String> handleNotFound(RuntimeException ex) {
//      return Map.of("error", ex.getMessage());
//    }
}
