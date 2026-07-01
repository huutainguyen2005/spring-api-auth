package vn.edu.fpt.sba.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
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
    Long genreId;

    String name;

    String description;

    BigDecimal popularityScore;

    @Column(nullable = false)
    Boolean isActive;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    LocalDateTime createdAt;

    @UpdateTimestamp
    LocalDateTime updatedAt;
}
