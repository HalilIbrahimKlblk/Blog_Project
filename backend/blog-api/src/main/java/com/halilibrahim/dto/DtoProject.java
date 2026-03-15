package com.halilibrahim.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoProject {
	
	private Integer id;
	private String img;
	private String title;
	private String description;
	private List<String> skills;
	private Map<String, String> socialMedia;
	private Integer heart;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
}
