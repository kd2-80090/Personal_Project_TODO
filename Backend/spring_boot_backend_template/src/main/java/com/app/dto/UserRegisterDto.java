package com.app.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserRegisterDto {
	
	@JsonProperty(access =Access.READ_ONLY )
	private Long id;
	
	String email;
	
	String name;
	
	Long contact;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
}
