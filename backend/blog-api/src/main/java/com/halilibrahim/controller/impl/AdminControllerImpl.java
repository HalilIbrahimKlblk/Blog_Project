package com.halilibrahim.controller.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.controller.IAdminController;
import com.halilibrahim.dto.DtoAdmin;
import com.halilibrahim.dto.DtoAdminHome;
import com.halilibrahim.dto.DtoAdminInfo;
import com.halilibrahim.dto.DtoAdminLogin;
import com.halilibrahim.dto.DtoChangePassword;
import com.halilibrahim.dto.DtoForgotPassword;
import com.halilibrahim.dto.DtoResetPassword;
import com.halilibrahim.services.IAdminService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/blog-api/v1/admin")
public class AdminControllerImpl implements IAdminController{

	@Autowired
	private IAdminService adminService;
	
	@PostMapping(path = "/save")
	public DtoAdmin saveAdmin(@RequestBody @Valid DtoAdmin dtoAdmin) {
		return adminService.saveAdmin(dtoAdmin);
	}
	
	@PutMapping(path = "/update/{id}")
	@Override
	public DtoAdmin updateAdmin(@PathVariable Integer id, @RequestBody DtoAdmin dtoAdmin) {
		return adminService.updateAdmin(id, dtoAdmin);
	}
	
	@GetMapping(path = "/profile")
	@Override
	public DtoAdminHome getAdminProfile() {
		DtoAdminHome admin = adminService.getAdminProfile();
		return admin;
	}
	
	@PostMapping(path = "/login")
	public boolean login(@RequestBody DtoAdminLogin dtoAdminLogin) {
		return adminService.login(dtoAdminLogin);
	}

	@PostMapping(path = "/forgot-password")
	@Override
	public boolean forgotPassword(@RequestBody DtoForgotPassword dtoForgotPassword) {
		return adminService.forgotPassword(dtoForgotPassword);
	}

	@PostMapping(path = "/reset-password")
	@Override
	public boolean resetPassword(@RequestBody DtoResetPassword dtoResetPassword) {
		return adminService.resetPassword(dtoResetPassword);
	}
	
	@GetMapping(path = "/info")
	@Override
	public DtoAdminInfo getAdminInfo() {
		DtoAdminInfo admin = adminService.getAdminInfo();
		return admin;
	}
	
	@PostMapping("/profile-file") 
	@Override
	public ResponseEntity<?> uploadProfileImage(@RequestParam("profileImage") MultipartFile file) {
	    try {
	        String savedImageName = adminService.updateProfileImage(file);

	        return ResponseEntity.ok().body(java.util.Map.of(
	            "message", "Profil fotoğrafı başarıyla güncellendi.",
	            "img", savedImageName
	        ));
	    } catch (Exception e) {
	        return ResponseEntity.badRequest().body("Fotoğraf yükleme hatası: " + e.getMessage());
	    }
	}
	
	@PostMapping("/change-password")
	public ResponseEntity<Map<String, String>> changePassword(@RequestBody DtoChangePassword dtoChangePassword) {
	    boolean isUpdated = adminService.changePassword(dtoChangePassword);
	    
	    Map<String, String> response = new HashMap<>();
	    
	    if (isUpdated) {
	        response.put("message", "Şifreniz başarıyla güncellendi.");
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("error", "Mevcut şifreniz hatalı!");
	        return ResponseEntity.badRequest().body(response);
	    }
	}
}
