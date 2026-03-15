package com.halilibrahim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.halilibrahim.entities.Blog;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer>{

}
