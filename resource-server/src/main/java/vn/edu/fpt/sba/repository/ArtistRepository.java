package vn.edu.fpt.sba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.sba.entity.Artist;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, Long> {
}
