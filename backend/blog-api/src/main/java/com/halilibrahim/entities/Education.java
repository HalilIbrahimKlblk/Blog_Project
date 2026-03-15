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
@Table(name = "Education")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Education {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "date", nullable = false, length = 11)
	private String date;
	
	@Column(name = "title", nullable = false, length = 25)
	private String title;
	
	@Column(name = "section", nullable = false, length = 50)
	private String section;
}
