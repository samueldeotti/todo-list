package com.samuel.todo_list.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class UsernameInUseException extends RuntimeException {

    public UsernameInUseException() {
      super("This username is already in use");
    }
}
