package com.app.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Task;
import com.app.entity.User;

public interface TaskDao extends JpaRepository<Task, Long> {

	Optional<List<Task>> findAllByUser(User user);

}
