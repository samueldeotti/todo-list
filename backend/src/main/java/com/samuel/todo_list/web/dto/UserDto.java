package com.samuel.todo_list.web.dto;

import com.samuel.todo_list.domain.entities.User;

public record UserDto(Long id, String username) {

  public static UserDto fromEntity(User user) {
    return new UserDto(user.getId(), user.getUsername());
  }

}
