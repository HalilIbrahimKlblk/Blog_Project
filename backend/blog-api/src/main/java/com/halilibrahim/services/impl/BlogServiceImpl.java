package com.halilibrahim.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.halilibrahim.dto.DtoBlog;
import com.halilibrahim.entities.Blog;
import com.halilibrahim.repository.BlogRepository;
import com.halilibrahim.services.IBlogService;

@Service
public class BlogServiceImpl implements IBlogService{

	@Autowired
	private BlogRepository blogRepository;
	
	public DtoBlog saveBlog(DtoBlog dtoBlog) {
		Blog blog = new Blog();
		
		blog.setTitle(dtoBlog.getTitle());
		blog.setDescription(dtoBlog.getDescription());
		blog.setDate(dtoBlog.getDate());
		
		Blog saveBlog = blogRepository.save(blog);
		
		dtoBlog.setId(saveBlog.getId());
		return dtoBlog;
	}
	
	@Override
	public List<DtoBlog> getAllBlogs(){
		List<DtoBlog> dtoList = new ArrayList<>();
		List<Blog> blogList = blogRepository.findAll();
		
		for (Blog blog : blogList) {
			DtoBlog dto = new DtoBlog();
			BeanUtils.copyProperties(blog, dto);
			dtoList.add(dto);
		}
		
		return dtoList;
	}
	
	@Override
	public void deleteBlog(Integer id) {
		Optional<Blog> optional = blogRepository.findById(id);
		if (optional.isPresent()) {
			blogRepository.delete(optional.get());
		}
	}
	
	@Override
	public DtoBlog updateBlog(Integer id, DtoBlog dtoBlog) {
		DtoBlog dto = new DtoBlog();
		Optional<Blog> optional = blogRepository.findById(id);
		
		if(optional.isPresent()) {
			Blog dbBlog = optional.get();
			
			dbBlog.setTitle(dtoBlog.getTitle());
			dbBlog.setDescription(dtoBlog.getDescription());
			dbBlog.setDate(dtoBlog.getDate());
			
			Blog updatedBlog = blogRepository.save(dbBlog);
			BeanUtils.copyProperties(updatedBlog, dto);
			return dto;
		}
		return null;
	}
	
	@Override
	public DtoBlog getBlogById(Integer id) {
		DtoBlog dto = new DtoBlog();
		Optional<Blog> optional = blogRepository.findById(id);
		if (optional.isPresent()) {
			Blog dbBlog = optional.get();
			BeanUtils.copyProperties(dbBlog, dto);
		}
		return dto;
	}
}
