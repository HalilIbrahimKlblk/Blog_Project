package com.halilibrahim.services.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.dto.DtoProject;
import com.halilibrahim.entities.Project;
import com.halilibrahim.repository.ProjectRepository;
import com.halilibrahim.services.IFileService;
import com.halilibrahim.services.IProjectService;

@Service
public class ProjectServiceImpl implements IProjectService{

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private IFileService fileService;
	
		@Override
		public DtoProject saveProject(DtoProject dtoProject, MultipartFile file) throws IOException {
			
			if (file != null && !file.isEmpty()) {
				String fileName = fileService.saveImage(file);
				dtoProject.setImg(fileName);
			}

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
	public DtoProject updateProject(Integer id, DtoProject dtoProject, MultipartFile file) throws IOException {
		DtoProject dto = new DtoProject();
		Optional<Project> optional = projectRepository.findById(id);
		
		if (optional.isPresent()) {
			Project dbProject = optional.get();
			
			if (file != null && !file.isEmpty()) {
				String fileName = fileService.saveImage(file);
				dbProject.setImg(fileName);
			} else {
				dbProject.setImg(dtoProject.getImg());
			}

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
	
	@Override
	public void increaseHeartCount(Integer id) {
	    Project project = projectRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Proje bulunamadı id: " + id));
	    
	    int currentHearts = project.getHeart() != null ? project.getHeart() : 0;
	    
	    project.setHeart(currentHearts + 1);
	    
	    projectRepository.save(project);
	}
}
