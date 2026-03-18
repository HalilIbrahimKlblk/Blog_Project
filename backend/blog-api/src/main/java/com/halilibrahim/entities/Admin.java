package com.halilibrahim.entities;

import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Admin")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Admin {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "name", nullable = false, length = 15)
	private String name;
	
	@Column(name = "surname", nullable = false, length = 15)
	private String surname;
	
	@Column(name = "username", nullable = false, length = 15)
	private String username;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "img", nullable = false, length = 50)
	private String img;
	
	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "sections", columnDefinition = "jsonb")
	private List<String> sections;
	
	@Column(name = "about", nullable = false, length = 1000)
	private String about;
	
	@Column(name = "location", nullable = false)
	private String location;
	
	@Column(name = "email", nullable = false)
	private String email;
	
	@JdbcTypeCode(SqlTypes.JSON)
	@Column(name = "social_media", columnDefinition = "jsonb")
	private Map<String, String> socialMedia;
}
