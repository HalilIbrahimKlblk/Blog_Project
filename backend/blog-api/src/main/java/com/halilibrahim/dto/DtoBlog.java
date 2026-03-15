package com.halilibrahim.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoBlog {
	
	private Integer id;
	private String title;
	private String description;
	
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate date;
}
