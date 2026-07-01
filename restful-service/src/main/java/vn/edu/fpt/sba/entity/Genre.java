package vn.edu.fpt.sba.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Genre")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GenreId")
    Integer genreId;

    @Column(name = "Name")
    String name;

    @Column(name = "Description")
    String description;

    @Column(name = "PopularityScore", nullable = false)
    @ColumnDefault("50")
    BigDecimal popularityScore;

    @Column(name = "IsActive", nullable = false)
    Boolean isActive;

    @CreationTimestamp
    @Column(name = "CreatedAt", updatable = false, nullable = false)
    LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UpdatedAt")
    LocalDateTime updatedAt;
}
