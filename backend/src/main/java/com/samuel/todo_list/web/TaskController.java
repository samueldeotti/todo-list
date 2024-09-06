package com.samuel.todo_list.web;


import com.samuel.todo_list.domain.entities.Task;
import com.samuel.todo_list.domain.service.TasksService;
import com.samuel.todo_list.web.dto.TaskDto;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/tasks")
public class TaskController {

  private final TasksService tasksService;

  @GetMapping("/user/{userId}")
  public ResponseEntity<List<TaskDto>> getAllTasksByUser(@PathVariable Long userId) {

    List<Task> tasks = this.tasksService.findAllByUser(userId);

    return ResponseEntity.ok(tasks.stream().map(TaskDto::fromEntity).toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<TaskDto> getTaskById(@PathVariable Long id) {
    return ResponseEntity.ok(TaskDto.fromEntity(this.tasksService.findById(id)));
  }

  @PostMapping("create/{userId}")
  public ResponseEntity<TaskDto> createTask(@PathVariable Long userId, @RequestBody @Valid Task task) {
//    Task newTask = this.tasksService.save(userId, task);

//    System.out.println(newTask);
    return ResponseEntity.status(201).body(TaskDto.fromEntity(this.tasksService.save(userId, task)));
  }

  @PatchMapping("/update/{id}")
  public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @RequestBody @Valid Task task) {
    return ResponseEntity.ok(TaskDto.fromEntity(this.tasksService.update(id, task)));
  }

  @PatchMapping("/delete/{id}")
  public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
    this.tasksService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

}
