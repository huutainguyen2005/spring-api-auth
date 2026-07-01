package vn.edu.fpt.sba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.sba.entity.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer> {
}
