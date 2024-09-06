package com.samuel.todo_list.domain.service;

import com.samuel.todo_list.domain.entities.User;
import com.samuel.todo_list.domain.repository.UserRepository;
import com.samuel.todo_list.exceptions.UserNotFoundException;
import com.samuel.todo_list.exceptions.UsernameInUseException;
import jakarta.transaction.Transactional;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserService {

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

    user.toBuilder().password(this.passwordEncoder.encode(user.getPassword())).build();

    return this.userRepository.save(user);
  }


//  public User updateUser(User updatedUser) throws UsernameInUseException, UserNotFoundException {
//    Users existingUser = this.getUserById(updatedUser.getId());
//
//    Optional<Users> usersOptional = this.usersRepository.findByEmail(updatedUser.getEmail());
//
//    if (usersOptional.isPresent() && !Objects.equals(usersOptional.get().getId(),
//        existingUser.getId())) {
//      throw new EmailInUseException();
//    }
//
//    return usersRepository.save(existingUser.toBuilder()
//        .name(updatedUser.getName())
//        .email(updatedUser.getEmail())
//        .password(this.passwordEncoder.encode(updatedUser.getPassword()))
//        .build());
//  }


  /**
   * Auth dto.
   *
   * @param authDto the auth dto
   * @return the auth dto
   */
//  public AuthDto authUser(AuthDto authDto) {
//    Users users = this.findByEmail(authDto.getEmail());
//
//    if (!this.passwordEncoder.matches(authDto.getPassword(), users.getPassword())) {
//      throw new RuntimeException("Invalid password");
//    }
//
//    String password = users.getEmail() + ":" + users.getPassword();
//
//    return AuthDto.builder().email(users.getEmail()).token(
//        Base64.getEncoder().withoutPadding().encodeToString(password.getBytes())
//    ).id(users.getId()).build();
//  }


}
