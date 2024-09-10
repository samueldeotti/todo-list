package com.samuel.todo_list.domain.service;

import com.samuel.todo_list.domain.entities.Task;
import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.domain.repository.TaskRepository;
import com.samuel.todo_list.domain.repository.UserRepository;
import com.samuel.todo_list.domain.service.exceptions.TaskNotFoundException;
import com.samuel.todo_list.domain.service.exceptions.UserNotFoundException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class TasksService {

  private final TaskRepository taskRepository;
  private final UserService userService;

  public List<Task> findAllByUser(Long userId) throws UserNotFoundException {

    User user = userService.getUserById(userId);

    return taskRepository.findAllByUser(user);
  }

  public Task findById(Long id) throws TaskNotFoundException {
    return taskRepository.findById(id).orElseThrow(TaskNotFoundException::new);
  }

  public Task save(Long userId, Task task) throws UserNotFoundException {

    User user = userService.getUserById(userId);

    task.setUser(user);
    return taskRepository.save(task);
  }

  public Task update(Long taskId, Task task) throws TaskNotFoundException {
    Task taskToUpdate = taskRepository.findById(taskId).orElseThrow(TaskNotFoundException::new);

    taskToUpdate.setTitle(task.getTitle());
    taskToUpdate.setDescription(task.getDescription());
    taskToUpdate.setStatus(task.getStatus());

    return taskRepository.save(taskToUpdate);
  }

  public void deleteById(Long id) throws TaskNotFoundException {
    taskRepository.findById(id).orElseThrow(TaskNotFoundException::new);

    taskRepository.deleteById(id);
  }

  public void deleteAllByUser(Long userId) throws UserNotFoundException {
    User user = userService.getUserById(userId);
    taskRepository.deleteAllByUser(user);
  }

  public void deleteByUserAndStatus(Long userId, String status) throws UserNotFoundException {
    User user = userService.getUserById(userId);
    taskRepository.deleteByUserAndStatus(user, status);
  }
}
