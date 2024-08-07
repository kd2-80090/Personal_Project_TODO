package com.app.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "users")
@Getter
@Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // or another strategy if you manually set the ID
    private Long id;
	
	String email;
	
	String name;
	
	Long contact;
	
	String password;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Task> tasks = new ArrayList<Task>();
	
	public void addTask(Task t) {
		this.tasks.add(t);
		t.setUser(this);
	}
	
	public void removeTask (Task t) {
		this.tasks.remove(t);
		t.setUser(null);
	}
	
}
