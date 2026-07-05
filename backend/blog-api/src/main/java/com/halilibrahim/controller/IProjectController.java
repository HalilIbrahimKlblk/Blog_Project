package com.halilibrahim.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.dto.DtoProject;

public interface IProjectController {

	public DtoProject saveProject(DtoProject dtoProject, MultipartFile file) throws IOException;
	
	public 	List<DtoProject> getAllProjects();
	
	public void deleteProject(Integer id);
	
	public DtoProject updateProject(Integer id, DtoProject dtoProject, MultipartFile file) throws IOException;
	
	public DtoProject getProjectById(Integer id);
	
	public void likeProject(Integer id);
}
