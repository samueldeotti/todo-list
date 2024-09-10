package com.samuel.todo_list.domain.repository;

import com.samuel.todo_list.domain.entities.Task;
import com.samuel.todo_list.domain.entities.User;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findAllByUser(User user);

  @Transactional
  void deleteAllByUser(User user);

  @Transactional
  void deleteByUserAndStatus(User user, String status);
}
