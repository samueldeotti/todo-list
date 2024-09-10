package com.samuel.todo_list.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "TASKS")
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty(message = "Title is required")
  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "description")
  private String description;

  @NotEmpty(message = "status is required")
  @Column(name = "status", nullable = false)
  private String status;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;


}
