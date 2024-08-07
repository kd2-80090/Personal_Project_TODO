package com.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TaskDto {

	@JsonProperty(access =Access.READ_ONLY )
	private Long id;
	
	String title;
	
	String description;
	
	boolean completed;
	
	String priority;
	
	private Long userId;
}
