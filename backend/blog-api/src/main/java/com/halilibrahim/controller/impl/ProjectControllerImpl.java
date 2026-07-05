package com.halilibrahim.controller.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.controller.IProjectController;
import com.halilibrahim.dto.DtoProject;
import com.halilibrahim.services.IProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/blog-api/v1/project")
public class ProjectControllerImpl implements IProjectController{

	@Autowired
	private IProjectService projectService;
	
	@PostMapping(path = "/save")
	@Override
	public DtoProject saveProject(
			@RequestPart("project") @Valid DtoProject dtoProject,
			@RequestPart(value = "file", required = false) MultipartFile file
	) throws IOException {
		return projectService.saveProject(dtoProject, file);
	}
	
	@GetMapping(path = "/list")
	@Override
	public List<DtoProject> getAllProjects(){
		return projectService.getAllProjects();
	}
	
	@DeleteMapping(path = "/delete/{id}")
	@Override
	public void deleteProject(@PathVariable Integer id) {
		projectService.deleteProject(id);
	}
	
	@PutMapping(path = "/update/{id}")
	@Override
	public DtoProject updateProject(
			@PathVariable Integer id, 
			@RequestPart("project") DtoProject dtoProject,
			@RequestPart(value = "file", required = false) MultipartFile file
	) throws IOException {
		return projectService.updateProject(id, dtoProject, file);
	}
	
	@GetMapping(path = "/list/{id}")
	@Override
	public DtoProject getProjectById(@PathVariable Integer id) {
		return projectService.getProjectById(id);
	}
	
	@PutMapping(path = "/like/{id}")
	@Override 
	public void likeProject(@PathVariable Integer id) {
		projectService.increaseHeartCount(id);
	}
}