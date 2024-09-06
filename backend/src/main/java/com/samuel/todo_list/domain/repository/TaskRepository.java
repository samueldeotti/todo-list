package com.samuel.todo_list.domain.repository;

import com.samuel.todo_list.domain.entities.Task;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findAllByUserId(Long userId);

}
