package com.samuel.todo_list.web.dto;

import com.samuel.todo_list.domain.entities.Task;

public record TaskDto(Long id, String title, String description, String status) {

  public static TaskDto fromEntity(Task task) {
    return new TaskDto(task.getId(), task.getTitle(), task.getDescription(), task.getStatus());
  }

}
