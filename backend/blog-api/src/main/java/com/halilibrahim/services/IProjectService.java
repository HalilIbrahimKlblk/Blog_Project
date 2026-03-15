package com.halilibrahim.services;

import java.util.List;

import com.halilibrahim.dto.DtoProject;

public interface IProjectService {

	public DtoProject saveProject(DtoProject dtoProject);
	
	public List<DtoProject> getAllProjects();
	
	public void deleteProject(Integer id);
	
	public DtoProject updateProject(Integer id, DtoProject dtoProject);
	
	public DtoProject getProjectById(Integer id);
}
