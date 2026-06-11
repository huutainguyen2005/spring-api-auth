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
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.configuration.GenericConfig;
import vn.edu.fpt.sba.dto.request.AlbumRequestDTO;
import vn.edu.fpt.sba.dto.response.*;
import vn.edu.fpt.sba.entity.Album;
import vn.edu.fpt.sba.exception.ApiError;
import vn.edu.fpt.sba.service.IAlbumService;

@RestController
@RequestMapping("/api/v1/albums")
@RequiredArgsConstructor
@Tag(name = "Album APIs", description = "APIs for managing albums")
public class AlbumController {

    private final IAlbumService albumService;

    @GetMapping
    @Operation(summary = "Get album list", description = "This API will return an album list")
    @ApiResponse(
            responseCode = "200",
            description = "Success",
            content = @Content(
                    mediaType = "application/json",
                    schema = @Schema(implementation = AlbumDetailResponseDTO.class)
            )
    )
    public PageResponseDTO<AlbumDetailResponseDTO> getAllAlbums(@ParameterObject @PageableDefault(size = 10) Pageable pageable){
        Page<AlbumDetailResponseDTO> pageRes = albumService.getAllAlbums(pageable);
        return PageResponseDTO.of(pageRes);

    }

    @GetMapping("/{albumId}")
    @Operation(summary = "Get album by ID", description = "This API will return an album by its ID")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Found",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AlbumDetailResponseDTO.class)
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
    public ResponseEntity<AlbumDetailResponseDTO> findById(@PathVariable Long albumId) {
        AlbumDetailResponseDTO album = albumService.findById(albumId);

        if (album == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(album);
    }


    @PostMapping
    @Operation(summary = "Create album", description = "This API will create an new album")
    @ResponseStatus(HttpStatus.CREATED)
    public AlbumDetailResponseDTO save(@Valid @RequestBody AlbumRequestDTO albumRequestDTO) {
        return albumService.save(albumRequestDTO);
    }

    @PutMapping("/{albumId}")
    @Operation(summary = "Update album", description = "This API will update an album by its ID")
    public ResponseEntity<AlbumDetailResponseDTO> updateAlbum(
            @PathVariable Long albumId,
            @RequestBody AlbumRequestDTO request
    ) {

        AlbumDetailResponseDTO updatedAlbum =
                albumService.update(albumId, request);

        if (updatedAlbum == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedAlbum);
    }

    @DeleteMapping("/{albumId}")
    @Operation(summary = "Delete album", description = "This API will delete an album")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public ResponseEntity<Void> deleteAlbum(@PathVariable Long albumId) {
        albumService.delete(albumId);
        return ResponseEntity.noContent().build();
    }
}
