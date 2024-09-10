package com.samuel.todo_list.web;

import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.domain.service.TokenService;
import com.samuel.todo_list.swaggerInterfaces.AuthSwagger;
import com.samuel.todo_list.web.dto.AuthDto;
import com.samuel.todo_list.web.dto.TokenDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController implements AuthSwagger {

  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;

  @Autowired
  public AuthController(
      AuthenticationManager authenticationManager,
      TokenService tokenService
  ) {
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
  }

  @PostMapping("/login")
  public TokenDto login(@RequestBody AuthDto authDto) {

    UsernamePasswordAuthenticationToken usernamePassword =
        new UsernamePasswordAuthenticationToken(authDto.username(), authDto.password());

    Authentication auth = authenticationManager.authenticate(usernamePassword);

    String token = tokenService.generateToken(auth.getName());

    User user = (User) auth.getPrincipal();

    return new TokenDto(token, user.getId(), user.getUsername());
  }

  @PostMapping("/status")
  public ResponseEntity<String> checkToken(@RequestBody String token) {
    // Remove "Bearer " se o token vier com esse prefixo
    String cleanToken = token.replace("Bearer ", "");

    try {
      String username = tokenService.validateToken(cleanToken);
      return ResponseEntity.ok("Token is valid for user: " + username);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
    }
  }
}
