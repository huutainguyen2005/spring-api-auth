package vn.edu.fpt.sba.authserver.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.sba.authserver.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
