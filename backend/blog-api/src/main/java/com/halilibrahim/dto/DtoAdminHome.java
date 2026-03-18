package com.halilibrahim.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DtoAdminHome {
	private String name;
	private String surname;
	private String img;
	private List<String> sections;
	private String about;
	private String location;
	private String email;
	private Map<String, String> socialMedia;
}
