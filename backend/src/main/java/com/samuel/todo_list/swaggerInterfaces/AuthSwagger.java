package com.samuel.todo_list.swaggerInterfaces;

import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.web.dto.AuthDto;
import com.samuel.todo_list.web.dto.TokenDto;
import com.samuel.todo_list.web.dto.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Auth", description = "Auth Endpoints")
public interface AuthSwagger {

  @Operation(summary = "Authenticate and generate a token", tags = "Auth")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return an token and user data"),
      @ApiResponse(responseCode = "400", description = "Usuário inexistente ou senha inválida", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Usuário inexistente ou senha inválida\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  TokenDto login(AuthDto authDto);


  @Operation(summary = "Check if token is valid", tags = "Auth")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Return a message with the username"),
      @ApiResponse(responseCode = "401", description = "Invalid or expired token", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Invalid or expired token\"")
          }
      )),
      @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @io.swagger.v3.oas.annotations.media.Content(
          schema = @Schema(implementation = String.class),
          examples = {
              @ExampleObject(value = "\"Internal Server Error\"")
          }
      ))
  })
  ResponseEntity<String> checkToken(String token);


}
