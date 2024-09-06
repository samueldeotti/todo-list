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
  private final UserRepository userRepository;

  public List<Task> findAllByUser(Long userId) throws UserNotFoundException {

    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      throw new UserNotFoundException();
    }

    return taskRepository.findAllByUserId(userId);
  }

  public Task findById(Long id) throws TaskNotFoundException {
    return taskRepository.findById(id).orElseThrow(TaskNotFoundException::new);
  }

  public Task save(Long userId, Task task) throws UserNotFoundException {
    userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

    return taskRepository.save(task);
  }

  public Task update(Task task) throws TaskNotFoundException {
    Task taskToUpdate = taskRepository.findById(task.getId()).orElseThrow(TaskNotFoundException::new);

    taskToUpdate.setTitle(task.getTitle());
    taskToUpdate.setDescription(task.getDescription());
    taskToUpdate.setStatus(task.getStatus());

    return taskRepository.save(taskToUpdate);
  }

  public void deleteById(Long id) throws TaskNotFoundException {
    Task task = taskRepository.findById(id).orElseThrow(TaskNotFoundException::new);

    taskRepository.deleteById(id);
  }
}
