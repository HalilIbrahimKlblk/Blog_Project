package com.halilibrahim.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Skill")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	
	@Column(name = "img", nullable = false, length = 50)
	private String img;
	
	@Column(name = "title", nullable = false, length = 15)
	private String title;
}
