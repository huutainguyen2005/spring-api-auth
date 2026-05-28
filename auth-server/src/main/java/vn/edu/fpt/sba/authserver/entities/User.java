package vn.edu.fpt.sba.authserver.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false,  unique = true, length = 100)
    private String email;

    @Column(name = "is_disabled", nullable = false)
    private Boolean isDisabled = false;

    @ManyToMany(fetch =  FetchType.EAGER)
    @JoinTable (
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )

    private Set<Role> roles = new HashSet<Role>();
}
