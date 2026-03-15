package com.halilibrahim.controller;

import java.util.List;

import com.halilibrahim.dto.DtoSkill;

public interface ISkillController {

	public DtoSkill saveSkill(DtoSkill dtoSkill);
	
	public List<DtoSkill> getAllSkills();
	
	public void deleteSkill(Integer id);
	
	public DtoSkill updateSkill(Integer id, DtoSkill dtoSkill);
	
	public DtoSkill getSkillById(Integer id);
}
