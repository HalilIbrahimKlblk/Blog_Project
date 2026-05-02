package com.halilibrahim.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoAdminInfo {
	private String name;
	private String surname;
	private String username;
	private String img;
}
