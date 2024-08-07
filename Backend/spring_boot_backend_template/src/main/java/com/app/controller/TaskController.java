package com.app.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.TaskDao;
import com.app.dao.UserDao;
import com.app.dto.TaskDto;
import com.app.entity.Task;
import com.app.entity.User;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class TaskController {

	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping
	public List<Task> getTasks() {
		return taskDao.findAll();
	}
	
	@PostMapping("/addTask")
	public TaskDto addTask(@RequestBody TaskDto taskDto) {
	    Long userId = taskDto.getUserId(); // Extract userId from taskDto

	    if (userId == null) {
	        throw new IllegalArgumentException("User ID must not be null");
	    }

	    try {
	        User user = userDao.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
	        Task task = mapper.map(taskDto, Task.class);
	        task.setUser(user);
	        Task persistentTask = taskDao.save(task);
	        TaskDto respTaskDto = mapper.map(persistentTask, TaskDto.class);
	        respTaskDto.setUserId(userId);
	        return respTaskDto;
	    } catch (Exception e) {
	        e.printStackTrace(); // Log the exception for debugging
	        throw new RuntimeException("Failed to add task: " + e.getMessage());
	    }
	}

	@GetMapping("/getTaskById/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
	    return taskDao.findById(id)
	        .map(task -> ResponseEntity.ok(task))
	        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null)); // Return 404 Not Found if the task does not exist
	}
}
