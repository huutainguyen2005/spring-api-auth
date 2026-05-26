package vn.edu.fpt.sba.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private Boolean isDisabled;
    private LocalDateTime created;
    private LocalDateTime updated;

    public User(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.isDisabled = false;
        this.created = LocalDateTime.now();
        this.updated = LocalDateTime.now();
    }
}
