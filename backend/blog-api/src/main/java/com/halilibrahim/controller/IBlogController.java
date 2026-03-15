package com.halilibrahim.controller;

import java.util.List;

import com.halilibrahim.dto.DtoBlog;

public interface IBlogController {

	public DtoBlog saveBlog(DtoBlog dtoBlog);
	
	public List<DtoBlog> getAllBlogs();
	
	public void deleteBlog(Integer id);
	
	public DtoBlog updateBlog(Integer id, DtoBlog dtoBlog);
	
	public DtoBlog getBlogById(Integer id);
}
