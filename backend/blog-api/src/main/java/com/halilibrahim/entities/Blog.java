package com.halilibrahim.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

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
@Table(name = "Blog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Blog {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "title", nullable = false, length = 100)
	private String title;
	
	@Column(name = "description", nullable = false)
	private String description;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "date", nullable = false)
	private LocalDate date;
}
