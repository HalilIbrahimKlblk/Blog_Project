package com.halilibrahim.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilibrahim.dto.DtoSkill;
import com.halilibrahim.entities.Skill;
import com.halilibrahim.repository.SkillRepository;
import com.halilibrahim.services.ISkillService;

@Service
public class SkillServiceImpl implements ISkillService{

	@Autowired
	private SkillRepository skillRepository;
	
	public DtoSkill saveSkill(DtoSkill dtoSkill) {
		Skill skill = new Skill();
		skill.setTitle(dtoSkill.getTitle());
        skill.setImg(dtoSkill.getImg());

        Skill savedSkill = skillRepository.save(skill);
        
        dtoSkill.setId(savedSkill.getId());

        return dtoSkill;
	}
	
	@Override
	public List<DtoSkill> getAllSkills(){
		List<DtoSkill> dtoList = new ArrayList<>();
		List<Skill> skillList = skillRepository.findAll();
		
		for (Skill skill : skillList) {
			DtoSkill dto = new DtoSkill();
			BeanUtils.copyProperties(skill, dto);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	@Override
	public void deleteSkill(Integer id) {
		Optional<Skill> optional = skillRepository.findById(id);
		if (optional.isPresent()) {
			skillRepository.delete(optional.get());
		}
	}
	
	@Override
	public DtoSkill updateSkill(Integer id, DtoSkill dtoSkill) {
		DtoSkill dto = new DtoSkill();
		Optional<Skill> optional = skillRepository.findById(id);
		
		if(optional.isPresent()) {
			Skill dbSkill = optional.get();
			
			dbSkill.setImg(dtoSkill.getImg());
			dbSkill.setTitle(dtoSkill.getTitle());
			
			Skill updatedSkill = skillRepository.save(dbSkill);
			BeanUtils.copyProperties(updatedSkill, dto);
			return dto;
		}
		
		return null;
	}
	
	@Override
	public DtoSkill getSkillById(Integer id) {
		DtoSkill dto = new DtoSkill();
		Optional<Skill> optional = skillRepository.findById(id);
		if(optional.isPresent()) {
			Skill dbSkill = optional.get();
			BeanUtils.copyProperties(dbSkill, dto);
		}
		return dto;
	}
}
