package com.app.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Getter;
import lombok.Setter;

@Entity(name = "tasks")
@Getter
@Setter
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // or another strategy if you manually set the ID
    private Long id;
	
	String title;
	
	String description;
	
	boolean completed;
	
	String priority;
	
	@ManyToOne
	@JoinColumn(name = "user_id",nullable = false)
	private User user;
	
}
