package com.halilibrahim.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.halilibrahim.controller.IBlogController;
import com.halilibrahim.dto.DtoBlog;
import com.halilibrahim.services.IBlogService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/blog-api/v1/blog")
public class BlogControllerImpl implements IBlogController{

	@Autowired
	private IBlogService blogService;
	
	@PostMapping(path = "/save")
	public DtoBlog saveBlog(@RequestBody @Valid DtoBlog dtoBlog) {
		return blogService.saveBlog(dtoBlog);
	}
	
	@GetMapping(path = "/list")
	@Override
	public List<DtoBlog> getAllBlogs(){
		return blogService.getAllBlogs();
	}
	
	@DeleteMapping(path = "/delete/{id}")
	@Override
	public void deleteBlog(@PathVariable Integer id) {
		blogService.deleteBlog(id);
	}
	
	@PutMapping(path = "/update/{id}")
	@Override
	public DtoBlog updateBlog(@PathVariable Integer id, @RequestBody DtoBlog dtoBlog) {
		return blogService.updateBlog(id, dtoBlog);
	}
	
	@GetMapping(path = "/list/{id}")
	@Override
	public DtoBlog getBlogById(@PathVariable Integer id) {
		return blogService.getBlogById(id);
	}
}
