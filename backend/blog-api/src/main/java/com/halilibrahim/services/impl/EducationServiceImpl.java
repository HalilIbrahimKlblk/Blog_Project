package com.halilibrahim.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilibrahim.dto.DtoEducation;
import com.halilibrahim.entities.Education;
import com.halilibrahim.repository.EducationRepository;
import com.halilibrahim.services.IEducationService;

@Service
public class EducationServiceImpl implements IEducationService{

	@Autowired
	private EducationRepository educationRepository;
	
	public DtoEducation saveEducation(DtoEducation dtoEducation) {
		Education education = new Education();
		
		education.setDate(dtoEducation.getDate());
		education.setTitle(dtoEducation.getTitle());
		education.setSection(dtoEducation.getSection());
		
		Education savedEducation = educationRepository.save(education);
		
		dtoEducation.setId(savedEducation.getId());
		return dtoEducation;
	}
	
	@Override
	public List<DtoEducation> getAllEducations(){
		List<DtoEducation> dtoList = new ArrayList<>();
		List<Education> educationList = educationRepository.findAll();
		
		for (Education education : educationList) {
			DtoEducation dto = new DtoEducation();
			BeanUtils.copyProperties(education,dto);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	@Override
	public void deleteEducation(Integer id) {
		Optional<Education> optional = educationRepository.findById(id);
		if (optional.isPresent()) {
			educationRepository.delete(optional.get());
		}
	}
	
	
	@Override
	public DtoEducation updateEducation(Integer id, DtoEducation dtoEducation) {
		DtoEducation dto = new DtoEducation();
		Optional<Education> optional = educationRepository.findById(id);
		
		if (optional.isPresent()) {
			Education dbEducation = optional.get();
			
			dbEducation.setDate(dtoEducation.getDate());
			dbEducation.setTitle(dtoEducation.getTitle());
			dbEducation.setSection(dtoEducation.getSection());
			
			Education updatedEducation = educationRepository.save(dbEducation);
			BeanUtils.copyProperties(updatedEducation, dto);
			return dto;
		}
		return null;
	}
	
	@Override
	public DtoEducation getEducationById(Integer id) {
		DtoEducation dto = new DtoEducation();
		Optional<Education> optional = educationRepository.findById(id);
		if (optional.isPresent()) {
			Education dbEducation = optional.get();
			BeanUtils.copyProperties(dbEducation, dto);
		}
		return dto;
	}
}
