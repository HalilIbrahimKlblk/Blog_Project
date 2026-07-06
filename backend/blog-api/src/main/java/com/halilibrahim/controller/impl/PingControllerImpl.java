package com.halilibrahim.controller.impl;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.halilibrahim.controller.IPingController;

@RestController
public class PingControllerImpl implements IPingController{

	@GetMapping("/ping")
	public String ping() {
		return "OK - Sunucu tetiklendi!";
	}
}
