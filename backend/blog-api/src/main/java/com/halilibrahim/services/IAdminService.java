package com.halilibrahim.services;

import com.halilibrahim.dto.DtoAdmin;
import com.halilibrahim.dto.DtoAdminHome;
import com.halilibrahim.dto.DtoAdminLogin;

public interface IAdminService {

	public DtoAdmin saveAdmin(DtoAdmin dtoAdmin);
	
	public DtoAdmin updateAdmin(Integer id, DtoAdmin dtoAdmin);
	
	public DtoAdminHome getAdminProfile();
	
	public boolean login(DtoAdminLogin dtoAdminLogin);
}
