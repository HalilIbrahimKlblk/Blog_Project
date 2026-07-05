package com.halilibrahim.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.dto.DtoSkill;

public interface ISkillController {

	public DtoSkill saveSkill(DtoSkill dtoSkill, MultipartFile file) throws IOException;
	
	public List<DtoSkill> getAllSkills();
	
	public void deleteSkill(Integer id);
	
	public DtoSkill updateSkill(Integer id, DtoSkill dtoSkill, MultipartFile file) throws IOException;
	
	public DtoSkill getSkillById(Integer id);
}
