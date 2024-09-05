package com.samuel.todo_list.domain.repository;

import com.samuel.todo_list.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoy extends JpaRepository<User, Long> {

}
