package com.samuel.todo_list.web;

import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.domain.service.UserService;
import com.samuel.todo_list.swaggerInterfaces.UserSwagger;
import com.samuel.todo_list.web.dto.UserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController implements UserSwagger {

  private final UserService userService;

  @GetMapping("{id}")
  public ResponseEntity<UserDto> getUserById(@PathVariable @Valid Long id) {
    return ResponseEntity.ok(UserDto.fromEntity(this.userService.getUserById(id)));
  }

  @PostMapping("/create")
  public ResponseEntity<UserDto> createUser(@RequestBody @Valid User user) {
    return ResponseEntity.status(HttpStatus.CREATED).body(UserDto.fromEntity(this.userService.createUser(user)));
  }

}
