package com.halilibrahim.controller;

import java.util.List;

import com.halilibrahim.dto.DtoEducation;

public interface IEducationController {

	public DtoEducation saveEducation(DtoEducation dtoEducation);
	
	public List<DtoEducation> getAllEducations();
	
	public void deleteEducation(Integer id);
	
	public DtoEducation updateEducation(Integer id, DtoEducation dtoEducation);
	
	public DtoEducation getEducationById(Integer id);
}
