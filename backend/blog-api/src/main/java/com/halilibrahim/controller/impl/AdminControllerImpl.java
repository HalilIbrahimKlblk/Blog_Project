package com.halilibrahim.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.halilibrahim.controller.IAdminController;
import com.halilibrahim.dto.DtoAdmin;
import com.halilibrahim.dto.DtoAdminHome;
import com.halilibrahim.dto.DtoAdminLogin;
import com.halilibrahim.dto.DtoForgotPassword;
import com.halilibrahim.dto.DtoResetPassword;
import com.halilibrahim.services.IAdminService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
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
}
