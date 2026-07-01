package com.halilibrahim.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.halilibrahim.dto.DtoAdmin;
import com.halilibrahim.dto.DtoAdminHome;
import com.halilibrahim.dto.DtoAdminInfo;
import com.halilibrahim.dto.DtoAdminLogin;
import com.halilibrahim.dto.DtoChangePassword;
import com.halilibrahim.dto.DtoForgotPassword;
import com.halilibrahim.dto.DtoResetPassword;

public interface IAdminService {

	public DtoAdmin saveAdmin(DtoAdmin dtoAdmin);
	
	public DtoAdmin updateAdmin(Integer id, DtoAdmin dtoAdmin);
	
	public DtoAdminHome getAdminProfile();
	
	public boolean login(DtoAdminLogin dtoAdminLogin);
	
	public boolean forgotPassword(DtoForgotPassword dtoForgotPassword);
    
    public boolean resetPassword(DtoResetPassword dtoResetPassword);
    
    public DtoAdminInfo getAdminInfo();
    
    String updateProfileImage(MultipartFile file) throws IOException;
    
    boolean changePassword(DtoChangePassword dtoChangePassword);
}
