package com.samuel.todo_list.swaggerInterfaces;

import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.web.dto.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.ResponseEntity;

@Tag(name = "Users", description = "Users Endpoints")
public interface UserSwagger {

  @Operation(summary = "Get user by id", tags = "Users")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return an User by id"),
      @ApiResponse(responseCode = "403", description = "Unauthorized User | Invalid Token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Unauthorized User | Invalid Token\"")
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
  ResponseEntity<UserDto> getUserById(Long id);


  @Operation(summary = "Save user", tags = "Users")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Create and return an User"),
      @ApiResponse(responseCode = "400", description = "Invalid user data", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid user data\"")
          }
      )),
      @ApiResponse(responseCode = "409", description = "Username already in use", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Email already in use\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<UserDto> createUser(User user);




}
