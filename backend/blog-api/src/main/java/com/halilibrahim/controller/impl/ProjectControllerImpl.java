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

import com.halilibrahim.controller.IProjectController;
import com.halilibrahim.dto.DtoProject;
import com.halilibrahim.services.IProjectService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/blog-api/v1/project")
public class ProjectControllerImpl implements IProjectController{

	@Autowired
	private IProjectService projectService;
	
	@PostMapping(path = "/save")
	public DtoProject saveProject(@RequestBody @Valid DtoProject dtoProject) {
		return projectService.saveProject(dtoProject);
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
	public DtoProject updateProject(@PathVariable Integer id, @RequestBody DtoProject dtoProject) {
		return projectService.updateProject(id, dtoProject);
	}
	
	@GetMapping(path = "/list/{id}")
	@Override
	public DtoProject getProjectById(@PathVariable Integer id) {
		return projectService.getProjectById(id);
	}
}
