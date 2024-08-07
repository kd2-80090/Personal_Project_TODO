package com.app.controller;

import java.util.List;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.TaskDao;
import com.app.dao.UserDao;
import com.app.dto.TaskDto;
import com.app.dto.UserLogin;
import com.app.dto.UserRegisterDto;
import com.app.entity.Task;
import com.app.entity.User;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private TaskDao taskDao;
	
	@Autowired
	private ModelMapper mapper;
	
	@GetMapping("/getAllUsers")
	public List<User> getUsers() {
		return userDao.findAll();
	}
	
	@PostMapping("/register")
	public UserRegisterDto addUser(@RequestBody UserRegisterDto userDetailDto) {
		
		User user = mapper.map(userDetailDto,User.class);
		return mapper.map(userDao.save(user), UserRegisterDto.class);
	}
	
	@PostMapping("/login")
	public ResponseEntity<UserRegisterDto> doLogin(@RequestBody UserLogin userDetails) {
	    User user = userDao.findByEmail(userDetails.getEmail());

	    if (user == null || !user.getPassword().equals(userDetails.getPassword())) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }

	    UserRegisterDto userRespDTO = mapper.map(user, UserRegisterDto.class);
	    return ResponseEntity.ok(userRespDTO);
	}
	
	@GetMapping("/tasks/{userId}")
	public List<TaskDto> getTasks(@PathVariable Long userId) {
		
		User user = userDao.findById(userId).orElseThrow();

		List<Task> taskList = taskDao.findAllByUser(user).orElseThrow();

		List<TaskDto> taskDtoList = taskList.stream().map(task -> {
			TaskDto taskDto = mapper.map(task, TaskDto.class);
			taskDto.setUserId(userId);
			return taskDto;
		}).collect(Collectors.toList());

		return taskDtoList;

	}
}
