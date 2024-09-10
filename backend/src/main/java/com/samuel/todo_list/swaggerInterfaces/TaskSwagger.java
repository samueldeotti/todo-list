package com.samuel.todo_list.swaggerInterfaces;

import com.samuel.todo_list.domain.entities.Task;
import com.samuel.todo_list.web.dto.TaskDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "Tasks", description = "Tasks Endpoints")
public interface TaskSwagger {

  @Operation(summary = "Get all tasks by user ID", tags = "Tasks")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return a list of tasks by user ID"),
      @ApiResponse(responseCode = "404", description = "User not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"User not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<List<TaskDto>> getAllTasksByUser(Long userId);

  @Operation(summary = "Get task by ID", tags = "Tasks")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return a task by ID"),
      @ApiResponse(responseCode = "404", description = "Task not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Task not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<TaskDto> getTaskById(Long id);

  @Operation(summary = "Create a task", tags = "Tasks")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Create and return a new task"),
      @ApiResponse(responseCode = "400", description = "Invalid task data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid task data\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "User not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"User not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<TaskDto> createTask(Long userId, Task task);

  @Operation(summary = "Update a task by ID", tags = "Tasks")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Update and return the task"),
      @ApiResponse(responseCode = "400", description = "Invalid task data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid task data\"")
          }
      )),
      @ApiResponse(responseCode = "404", description = "Task not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Task not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<TaskDto> updateTask(Long id, Task task);

  @Operation(summary = "Delete a task by ID", tags = "Tasks")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Task deleted successfully"),
      @ApiResponse(responseCode = "404", description = "Task not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Task not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<Void> deleteTask(Long id);

  @Operation(summary = "Delete tasks by user ID and status", tags = "Tasks")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Tasks deleted successfully"),
      @ApiResponse(responseCode = "404", description = "User not found", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"User not found\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<Void> deleteTasksByUserAndStatus(Long userId, String status);
}
