package com.halilibrahim.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.halilibrahim.entities.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer>{

}
