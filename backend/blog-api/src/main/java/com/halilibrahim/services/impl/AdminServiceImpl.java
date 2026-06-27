package com.halilibrahim.services.impl;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;

import com.halilibrahim.dto.DtoAdmin;
import com.halilibrahim.dto.DtoAdminHome;
import com.halilibrahim.dto.DtoAdminInfo;
import com.halilibrahim.dto.DtoAdminLogin;
import com.halilibrahim.dto.DtoForgotPassword;
import com.halilibrahim.dto.DtoResetPassword;
import com.halilibrahim.entities.Admin;
import com.halilibrahim.repository.AdminRepository;
import com.halilibrahim.services.IAdminService;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService{

	@Autowired
	private AdminRepository adminRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Value("${spring.mail.username}")
	private String senderEmail;
	
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
		admin.setGithub(dtoAdmin.getGithub());
		admin.setLinkedln(dtoAdmin.getLinkedln());
		admin.setInstagram(dtoAdmin.getInstagram());
		admin.setX(dtoAdmin.getX());
		admin.setYoutube(dtoAdmin.getYoutube());
		admin.setSocialMedia(dtoAdmin.getSocialMedia());
		
		Admin saveAdmin = adminRepository.save(admin);
		dtoAdmin.setId(saveAdmin.getId());
		dtoAdmin.setPassword(null);
		return dtoAdmin;
	}
	
	@Override
	@Transactional 
	public DtoAdmin updateAdmin(Integer id, DtoAdmin dtoAdmin) {
	    System.out.println("REACT'TEN GELEN AD: " + dtoAdmin.getName());
	    
	    DtoAdmin dto = new DtoAdmin();
	    
	    // DİKKAT: findById(id) YERİNE SİSTEMDEKİ İLK ADMİNİ BULUYORUZ!
	    // Çünkü React'ten gelen ID yanlış.
	    Optional<Admin> optional = adminRepository.findAll().stream().findFirst();
	    
	    if (optional.isPresent()) {
	        Admin dbAdmin = optional.get();
	        
	        System.out.println("GÜNCELLENECEK GERÇEK ADMİN BULUNDU. ID: " + dbAdmin.getId());
	        
	        if(dtoAdmin.getName() != null) dbAdmin.setName(dtoAdmin.getName());
	        if(dtoAdmin.getSurname() != null) dbAdmin.setSurname(dtoAdmin.getSurname());
	        if(dtoAdmin.getUsername() != null) dbAdmin.setUsername(dtoAdmin.getUsername());
	        
	        if(dtoAdmin.getPassword() != null && !dtoAdmin.getPassword().trim().isEmpty()) {
	            dbAdmin.setPassword(passwordEncoder.encode(dtoAdmin.getPassword()));
	        }
	        
	        if(dtoAdmin.getImg() != null) dbAdmin.setImg(dtoAdmin.getImg());
	        if(dtoAdmin.getAbout() != null) dbAdmin.setAbout(dtoAdmin.getAbout());
	        if(dtoAdmin.getLocation() != null) dbAdmin.setLocation(dtoAdmin.getLocation());
	        if(dtoAdmin.getEmail() != null) dbAdmin.setEmail(dtoAdmin.getEmail());
	        if(dtoAdmin.getGithub() != null) dbAdmin.setGithub(dtoAdmin.getGithub());
	        if(dtoAdmin.getLinkedln() != null) dbAdmin.setLinkedln(dtoAdmin.getLinkedln());
	        if(dtoAdmin.getInstagram() != null) dbAdmin.setInstagram(dtoAdmin.getInstagram());
	        if(dtoAdmin.getX() != null) dbAdmin.setX(dtoAdmin.getX());
	        if(dtoAdmin.getYoutube() != null) dbAdmin.setYoutube(dtoAdmin.getYoutube());
	        
	        if(dtoAdmin.getSections() != null) {
	            dbAdmin.setSections(new ArrayList<>(dtoAdmin.getSections())); 
	        }
	        
	        if(dtoAdmin.getSocialMedia() != null) {
	             dbAdmin.setSocialMedia(dtoAdmin.getSocialMedia());
	        }
	        
	        // Değişiklikleri kaydet
	        Admin updatedAdmin = adminRepository.saveAndFlush(dbAdmin);
	        
	        BeanUtils.copyProperties(updatedAdmin, dto);
	        System.out.println("BAŞARILI! UPDATE SORGUSU ATILDI.");
	        
	        return dto;
	    }
	    
	    System.out.println("SİSTEMDE HİÇ ADMİN YOK!");
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
		dtoAdmin.setGithub(admin.getGithub());
		dtoAdmin.setLinkedln(admin.getLinkedln());
		dtoAdmin.setInstagram(admin.getInstagram());
		dtoAdmin.setX(admin.getX());
		dtoAdmin.setYoutube(admin.getYoutube());
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
	
	@Override
    public boolean forgotPassword(DtoForgotPassword dtoForgotPassword) {

		System.out.println("FRONTENDDEN GELEN MAIL: " + dtoForgotPassword.getEmail());
		
        Optional<Admin> optionalAdmin = adminRepository.findByEmail(dtoForgotPassword.getEmail());
        if (optionalAdmin.isEmpty()) {
            return false; 
        }

        Admin admin = optionalAdmin.get();

        // Token oluştur
        String token = UUID.randomUUID().toString();
        admin.setResetToken(token);
        admin.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
   
        adminRepository.save(admin);

        // Mail gönder
        String resetLink = "http://192.168.1.106:5173/reset-password?token=" + token;
        String subject = "Blog API - Şifre Sıfırlama Talebi";
        String message = "Merhaba,\n\nŞifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın. Bu bağlantı 15 dakika boyunca geçerlidir.\n\n" + resetLink;

        sendEmail(admin.getEmail(), subject, message);

        return true;
    }

    @Override
    public boolean resetPassword(DtoResetPassword dtoResetPassword) {
        // Token kontrolü
        Optional<Admin> optionalAdmin = adminRepository.findByResetToken(dtoResetPassword.getToken());

        if (optionalAdmin.isEmpty()) {
            return false; 
        }

        Admin admin = optionalAdmin.get();

        if (admin.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return false; 
        }

        String hashedNewPassword = passwordEncoder.encode(dtoResetPassword.getNewPassword());
        admin.setPassword(hashedNewPassword);

        admin.setResetToken(null);
        admin.setResetTokenExpiry(null);

        adminRepository.save(admin);

        return true;
    }
	
	private void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderEmail); 
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        
        mailSender.send(message);
    }
	
	@Override
	public DtoAdminInfo getAdminInfo() {
		Admin admin = adminRepository.findAll().stream().findFirst().orElseThrow(() -> new RuntimeException("Sisteme kayıtlı admin bulunamadı."));
		
		DtoAdminInfo dtoAdmin = new DtoAdminInfo();
		
		dtoAdmin.setName(admin.getName());
		dtoAdmin.setSurname(admin.getSurname());
		dtoAdmin.setUsername(admin.getUsername());
		dtoAdmin.setImg(admin.getImg());
		
		return dtoAdmin;
	}
}
