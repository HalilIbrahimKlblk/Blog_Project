package com.halilibrahim.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.halilibrahim.controller.IEducationController;
import com.halilibrahim.dto.DtoEducation;
import com.halilibrahim.services.IEducationService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/blog-api/v1/education")
public class EducationControllerImpl implements IEducationController{

	@Autowired
	private IEducationService educationService;
	
	@PostMapping(path = "/save")
	public DtoEducation saveEducation(@RequestBody @Valid DtoEducation dtoEducation) {
		return educationService.saveEducation(dtoEducation);
	}
	
	@GetMapping(path = "/list")
	@Override
	public List<DtoEducation> getAllEducations(){
		return educationService.getAllEducations();
	}
	
	@DeleteMapping(path = "/delete/{id}")
	@Override
	public void deleteEducation(@PathVariable Integer id) {
		educationService.deleteEducation(id);
	}
	
	@PutMapping(path = "/update/{id}")
	@Override
	public DtoEducation updateEducation(@PathVariable Integer id, @RequestBody DtoEducation dtoEducation) {
		return educationService.updateEducation(id, dtoEducation);
	}
	
	@GetMapping(path = "/list/{id}")
	@Override
	public DtoEducation getEducationById(@PathVariable Integer id) {
		return educationService.getEducationById(id);
	}
}
