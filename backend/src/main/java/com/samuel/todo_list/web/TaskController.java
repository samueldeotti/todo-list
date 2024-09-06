package com.samuel.todo_list.web;


import com.samuel.todo_list.domain.entities.Task;
import com.samuel.todo_list.domain.service.TasksService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/tasks")
public class TaskController {

  private final TasksService tasksService;

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<Task>> getAllTasksByUser(@PathVariable Long userId) {
    return ResponseEntity.ok(this.tasksService.findAllByUser(userId));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
    return ResponseEntity.ok(this.tasksService.findById(id));
  }

  @PostMapping("create/{userId}")
  public ResponseEntity<Task> createTask(@PathVariable Long userId, Task task) {
    return ResponseEntity.status(201).body(this.tasksService.save(userId, task));
  }

  @PatchMapping("/update")
  public ResponseEntity<Task> updateTask(Task task) {
    return ResponseEntity.ok(this.tasksService.update(task));
  }

  @PatchMapping("/delete/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    this.tasksService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

}
