package com.halilibrahim.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilibrahim.dto.DtoProject;
import com.halilibrahim.entities.Project;
import com.halilibrahim.repository.ProjectRepository;
import com.halilibrahim.services.IProjectService;

@Service
public class ProjectServiceImpl implements IProjectService{

	@Autowired
	private ProjectRepository projectRepository;
	
	public DtoProject saveProject(DtoProject dtoProject) {
		Project project = new Project();
		project.setImg(dtoProject.getImg());
		project.setTitle(dtoProject.getTitle());
		project.setDescription(dtoProject.getDescription());
		project.setSkills(dtoProject.getSkills());
		project.setSocialMedia(dtoProject.getSocialMedia());
		project.setHeart(dtoProject.getHeart());
		project.setDate(dtoProject.getDate());
		
		Project savedProject = projectRepository.save(project);
		
		dtoProject.setId(savedProject.getId());
		
		return dtoProject;
	}
	
	@Override
	public List<DtoProject> getAllProjects() {
		List<DtoProject> dtoList = new ArrayList<>();
		List<Project> projectList = projectRepository.findAll();
		
		for (Project project : projectList) {
			DtoProject dto = new DtoProject();
			BeanUtils.copyProperties(project, dto);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	@Override
	public void deleteProject(Integer id) {
		Optional<Project> optional = projectRepository.findById(id);
		if (optional.isPresent()) {
			projectRepository.delete(optional.get());
		}
	}
	
	@Override
	public DtoProject updateProject(Integer id, DtoProject dtoProject) {
		DtoProject dto = new DtoProject();
		Optional<Project> optional = projectRepository.findById(id);
		
		if (optional.isPresent()) {
			Project dbProject = optional.get();
			
			dbProject.setImg(dtoProject.getImg());
			dbProject.setTitle(dtoProject.getTitle());
			dbProject.setDescription(dtoProject.getDescription());
			dbProject.setSkills(dtoProject.getSkills());
			dbProject.setSocialMedia(dtoProject.getSocialMedia());
			dbProject.setHeart(dtoProject.getHeart());
			dbProject.setDate(dtoProject.getDate());
			
			Project updatedProject = projectRepository.save(dbProject);
			BeanUtils.copyProperties(updatedProject, dto);
			return dto;
		}
		
		return null;
	}
	
	@Override
	public DtoProject getProjectById(Integer id) {
		DtoProject dto = new DtoProject();
		Optional<Project> optional = projectRepository.findById(id);
		if (optional.isPresent()) {
			Project dbProject = optional.get();
			BeanUtils.copyProperties(dbProject, dto);
		}
		return dto;
	}
}
