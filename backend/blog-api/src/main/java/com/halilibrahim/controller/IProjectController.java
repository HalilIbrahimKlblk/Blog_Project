package com.halilibrahim.controller;

import java.util.List;

import com.halilibrahim.dto.DtoProject;

public interface IProjectController {

	public DtoProject saveProject(DtoProject dtoProject);
	
	public 	List<DtoProject> getAllProjects();
	
	public void deleteProject(Integer id);
	
	public DtoProject updateProject(Integer id, DtoProject dtoProject);
	
	public DtoProject getProjectById(Integer id);
}
