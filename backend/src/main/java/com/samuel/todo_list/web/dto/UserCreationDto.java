package com.samuel.todo_list.web.dto;

import com.samuel.todo_list.domain.entities.User;

public record UserCreationDto(String username, String password) {

  public User toEntity() {
    return User.builder()
        .username(username)
        .password(password)
        .build();
  }
}
