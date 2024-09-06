package com.samuel.todo_list.domain.service;

import com.samuel.todo_list.domain.entities.Task;
import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.domain.repository.TaskRepository;
import com.samuel.todo_list.domain.repository.UserRepositoy;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class TasksService {

  private final TaskRepository taskRepository;
  private final UserRepositoy userRepositoy;

  public List<Task> findAllByUser(Long userId) {
    return taskRepository.findAllByUserId(userId);
  }

  public Task findById(Long id) {
    return taskRepository.findById(id).orElse(null);
  }

  public Task save(Long userId, Task task) {
    User user = userRepositoy.findById(userId).orElse(null);

    if (user == null) {
      return null;
    }

    return taskRepository.save(task);
  }

  public Task update(Task task) {
    Task taskToUpdate = taskRepository.findById(task.getId()).orElse(null);

    if (taskToUpdate == null) {
      return null;
    }

    taskToUpdate.setTitle(task.getTitle());
    taskToUpdate.setDescription(task.getDescription());
    taskToUpdate.setStatus(task.getStatus());

    return taskRepository.save(taskToUpdate);
  }

  public void deleteById(Long id) {
    Task task = taskRepository.findById(id).orElse(null);

    if (task == null) {
      return;
    }

    taskRepository.deleteById(id);
  }
}
