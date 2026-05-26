package vn.edu.fpt.sba.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import vn.edu.fpt.sba.entity.User;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User APIs", description = "APIs for managing User")
public class UserController {

    private final List<User> users = new ArrayList<>();

    // http://localhost:8080/api/users/1
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return new User(id, "John", "john@fpt.com");
    }

    // 1) Lay danh sach users
    // API: GET /api/users
    // return 1 List cac user
    @GetMapping
    public List<User> getUsers() {
        users.add(new User(1L, "tai1", "tai1@gmail.com"));
        users.add(new User(2L, "tai2", "tai2@gmail.com"));
        users.add(new User(3L, "tai3", "tai3@gmail.com"));
        users.add(new User(4L, "tai4", "tai4@gmail.com"));
        return users;
    }

    // 2) Tao moi 1 user
    // POST /api/users
    // Return code 201
    // sout -> user da nhan
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody User user) {
        users.add(user);
        System.out.println("User input: \n" + user);
        return user;
    }
}
