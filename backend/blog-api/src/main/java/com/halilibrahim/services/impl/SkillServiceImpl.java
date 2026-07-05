package com.halilibrahim.services.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.dto.DtoSkill;
import com.halilibrahim.entities.Skill;
import com.halilibrahim.repository.SkillRepository;
import com.halilibrahim.services.IFileService;
import com.halilibrahim.services.ISkillService;

@Service
public class SkillServiceImpl implements ISkillService {

    @Autowired
    private SkillRepository skillRepository;
    
    @Autowired
    private IFileService fileService;

    @Override
    public DtoSkill saveSkill(DtoSkill dtoSkill, MultipartFile file) throws IOException {
        
        if (file != null && !file.isEmpty()) {
            String fileName = fileService.saveImage(file);
            dtoSkill.setImg(fileName);
        }

        Skill skill = new Skill();
        skill.setImg(dtoSkill.getImg());
        skill.setTitle(dtoSkill.getTitle());

        Skill savedSkill = skillRepository.save(skill);
        
        dtoSkill.setId(savedSkill.getId());

        return dtoSkill;
    }
    
    @Override
    public List<DtoSkill> getAllSkills() {
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
    public DtoSkill updateSkill(Integer id, DtoSkill dtoSkill, MultipartFile file) throws IOException {
        DtoSkill dto = new DtoSkill();
        Optional<Skill> optional = skillRepository.findById(id);
        
        if(optional.isPresent()) {
            Skill dbSkill = optional.get();
            
            // Sadece yeni bir dosya gerçekten gönderildiyse resim alanını güncelle
            if (file != null && !file.isEmpty()) {
                String fileName = fileService.saveImage(file);
                dbSkill.setImg(fileName);
            }
            // else bloğunu sildik! Dosya gelmediyse mevcut dbSkill resmini korumuş oluyoruz.

            // Metin (title) her halükarda güncelleniyor
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