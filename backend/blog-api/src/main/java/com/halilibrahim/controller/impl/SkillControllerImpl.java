package com.halilibrahim.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.halilibrahim.controller.ISkillController;
import com.halilibrahim.dto.DtoSkill;
import com.halilibrahim.services.ISkillService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/blog-api/v1/skill")
public class SkillControllerImpl implements ISkillController{

    @Autowired
    private ISkillService skillService;

    @PostMapping("/save")
    public DtoSkill saveSkill(@RequestBody @Valid DtoSkill dtoSkill) {
        return skillService.saveSkill(dtoSkill);
    }
    
    @GetMapping(path = "/list")
    @Override
    public List<DtoSkill> getAllSkills(){
    	return skillService.getAllSkills();
    }
    
    @DeleteMapping(path = "/delete/{id}")
    @Override
    public void deleteSkill(@PathVariable Integer id) {
    	skillService.deleteSkill(id);
    }
    
    @PutMapping(path = "/update/{id}")
    @Override
    public DtoSkill updateSkill(@PathVariable Integer id, @RequestBody DtoSkill dtoSkill) {
    	return skillService.updateSkill(id, dtoSkill);
    }
    
    @GetMapping(path = "/list/{id}")
    @Override
    public DtoSkill getSkillById(@PathVariable Integer id) {
    	return skillService.getSkillById(id);
    }
}