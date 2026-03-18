package com.halilibrahim.services.impl;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.halilibrahim.dto.DtoAdmin;
import com.halilibrahim.dto.DtoAdminHome;
import com.halilibrahim.dto.DtoAdminLogin;
import com.halilibrahim.entities.Admin;
import com.halilibrahim.repository.AdminRepository;
import com.halilibrahim.services.IAdminService;

@Service
public class AdminServiceImpl implements IAdminService{

	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public DtoAdmin saveAdmin(DtoAdmin dtoAdmin) {
		Admin admin = new Admin();
		
		admin.setName(dtoAdmin.getName());
		admin.setSurname(dtoAdmin.getSurname());
		admin.setUsername(dtoAdmin.getUsername());
		
		String rawPassword = dtoAdmin.getPassword();
		String hashedPassword = passwordEncoder.encode(rawPassword);
		admin.setPassword(hashedPassword);
		
		admin.setImg(dtoAdmin.getImg());
		admin.setSections(dtoAdmin.getSections());
		admin.setAbout(dtoAdmin.getAbout());
		admin.setLocation(dtoAdmin.getLocation());
		admin.setEmail(dtoAdmin.getEmail());
		admin.setSocialMedia(dtoAdmin.getSocialMedia());
		
		Admin saveAdmin = adminRepository.save(admin);
		dtoAdmin.setId(saveAdmin.getId());
		dtoAdmin.setPassword(null);
		return dtoAdmin;
	}
	
	@Override
	public DtoAdmin updateAdmin(Integer id, DtoAdmin dtoAdmin) {
		DtoAdmin dto = new DtoAdmin();
		Optional<Admin> optional = adminRepository.findById(id);
		
		if (optional.isPresent()) {
			Admin dbAdmin = optional.get();
			
			dbAdmin.setName(dtoAdmin.getName());
			dbAdmin.setSurname(dtoAdmin.getSurname());
			dbAdmin.setUsername(dtoAdmin.getUsername());
			dbAdmin.setPassword(dtoAdmin.getPassword());
			dbAdmin.setImg(dtoAdmin.getImg());
			dbAdmin.setSections(dtoAdmin.getSections());
			dbAdmin.setAbout(dtoAdmin.getAbout());
			dbAdmin.setLocation(dtoAdmin.getLocation());
			dbAdmin.setEmail(dtoAdmin.getEmail());
			dbAdmin.setSocialMedia(dtoAdmin.getSocialMedia());
			
			Admin updatedAdmin = adminRepository.save(dbAdmin);
			BeanUtils.copyProperties(updatedAdmin, dto);
			return dto;
		}
		return null;
	}
	
	@Override
	public DtoAdminHome getAdminProfile() {
		Admin admin = adminRepository.findAll().stream().findFirst().orElseThrow(() -> new RuntimeException("Sisteme kayıtlı admin bulunamadı."));
		
		DtoAdminHome dtoAdmin = new DtoAdminHome();
		
		dtoAdmin.setName(admin.getName());
		dtoAdmin.setSurname(admin.getSurname());
		dtoAdmin.setImg(admin.getImg());
		dtoAdmin.setAbout(admin.getAbout());
		dtoAdmin.setSections(admin.getSections());
		dtoAdmin.setLocation(admin.getLocation());
		dtoAdmin.setEmail(admin.getEmail());
		dtoAdmin.setSocialMedia(admin.getSocialMedia());
		
		return dtoAdmin;
	}
	
	@Override
	public boolean login(DtoAdminLogin dtoAdminLogin) {
		Optional<Admin> optional = adminRepository.findByUsername(dtoAdminLogin.getUsername());
		
		if (optional.isEmpty()) {
			return false;
		}
		
		Admin dbAdmin = optional.get();
		
		boolean isPasswordMatch = passwordEncoder.matches(dtoAdminLogin.getPassword(), dbAdmin.getPassword());
		return isPasswordMatch;
	}
}
