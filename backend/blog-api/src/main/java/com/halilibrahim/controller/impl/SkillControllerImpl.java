package com.halilibrahim.controller.impl;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.controller.ISkillController;
import com.halilibrahim.dto.DtoSkill;
import com.halilibrahim.services.ISkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/blog-api/v1/skill")
public class SkillControllerImpl implements ISkillController {

    @Autowired
    private ISkillService skillService;

    @PostMapping(path = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public DtoSkill saveSkill(
            @RequestPart("skill") @Valid DtoSkill dtoSkill,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        
        return skillService.saveSkill(dtoSkill, file);
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
    
    @PutMapping(path = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public DtoSkill updateSkill(
            @PathVariable Integer id, 
            @RequestPart("skill") DtoSkill dtoSkill,
            @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        
        return skillService.updateSkill(id, dtoSkill, file);
    }
    
    @GetMapping(path = "/list/{id}")
    @Override
    public DtoSkill getSkillById(@PathVariable Integer id) {
        return skillService.getSkillById(id);
    }
}