package com.halilibrahim.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import com.fasterxml.jackson.annotation.JsonFormat;

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
@Table(name = "Project")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "img", nullable = false, length = 50)
	private String img;
	
	@Column(name = "title", nullable = false, length = 50)
	private String title;
	
	@Column(name = "description", nullable = false, length = 750)
	private String description;

	@JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "skills", columnDefinition = "jsonb")
    private List<String> skills;
	
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "social_media", columnDefinition = "jsonb")
    private Map<String, String> socialMedia;
    
	@Column(name = "heart", nullable = false)
	private Integer heart;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "date", nullable = false)
	private LocalDate date;
}
