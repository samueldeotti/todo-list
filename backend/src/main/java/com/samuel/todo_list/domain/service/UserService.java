package com.samuel.todo_list.domain.service;

import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.domain.repository.UserRepository;
import com.samuel.todo_list.domain.service.exceptions.UserNotFoundException;
import com.samuel.todo_list.domain.service.exceptions.UsernameInUseException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;

  public User getUserById(Long id) throws UserNotFoundException {
    return userRepository.findById(id)
        .orElseThrow(UserNotFoundException::new);
  }

  public User createUser(User user) throws UsernameInUseException {

    Optional<User> usersOptional = this.userRepository.findByUsername(user.getUsername());

    if (usersOptional.isPresent()) {
      throw new UsernameInUseException();
    }

    String hashedPassword = new BCryptPasswordEncoder().encode(user.getPassword());

    user = user.toBuilder().password(hashedPassword).build();

    return this.userRepository.save(user);
  }


  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return userRepository.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }



}
