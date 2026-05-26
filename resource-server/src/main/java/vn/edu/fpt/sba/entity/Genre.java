package vn.edu.fpt.sba.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Genre")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GenreId")
    Long genreId;

    @Column(name = "Name")
    String name;
}
