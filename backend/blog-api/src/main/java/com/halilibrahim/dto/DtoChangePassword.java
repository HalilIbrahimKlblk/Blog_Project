package com.halilibrahim.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoChangePassword {
	private String oldPassword;
    private String newPassword;
}
