package com.samuel.todo_list.advice;

import com.samuel.todo_list.domain.service.exceptions.TaskNotFoundException;
import com.samuel.todo_list.domain.service.exceptions.UnauthorizedUserException;
import com.samuel.todo_list.domain.service.exceptions.UserNotFoundException;
import com.samuel.todo_list.domain.service.exceptions.UsernameInUseException;
import java.security.InvalidParameterException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class HandlerExceptionController {

  /**
   * Handle unauthorized user exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(UnauthorizedUserException.class)
  public ResponseEntity<String> handleUnauthorizedUserException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
  }

  /**
   * Handle email in use exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(UsernameInUseException.class)
  public ResponseEntity<String> handleUsernameInUseException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.CONFLICT).body(exception.getMessage());
  }

  /**
   * Handle user not found exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(UserNotFoundException.class)
  public ResponseEntity<String> handleUserNotFoundException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  @ExceptionHandler(TaskNotFoundException.class)
  public ResponseEntity<String> handleTaskNotFoundException(RuntimeException exception) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(exception.getMessage());
  }

  /**
   * Handle validation exceptions response entity.
   *
   * @param ex the ex
   * @return the response entity
   */
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(
            "Invalid Request Body\n" + ex.getBindingResult().getFieldError().getDefaultMessage());
  }


  /**
   * Handle invalid param exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(InvalidParameterException.class)
  public ResponseEntity<String> handleInvalidParamException(RuntimeException exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(exception.getMessage());
  }


  /**
   * Handle runtime exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<String> handleRuntimeException(RuntimeException exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_REQUEST)
        .body(exception.getMessage());
  }

  /**
   * Handle exception response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handleException(Exception exception) {
    return ResponseEntity
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(exception.getMessage());
  }

  /**
   * Handle throwable response entity.
   *
   * @param exception the exception
   * @return the response entity
   */
  @ExceptionHandler(Throwable.class)
  public ResponseEntity<String> handleThrowable(Throwable exception) {
    return ResponseEntity
        .status(HttpStatus.BAD_GATEWAY)
        .body(exception.getMessage());
  }
}
