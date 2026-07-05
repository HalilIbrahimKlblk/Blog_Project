package com.halilibrahim.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
                .allowedOrigins(
                    "http://localhost:5173", 
                    "http://192.168.1.106:5173",
                    "https://senin-projen.vercel.app", 
                    "https://halilibrahimkalabalik.com",         
                    "https://www.halilibrahimkalabalik.com"     
                ) 
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") 
                .allowedHeaders("*") 
                .allowCredentials(true) 
                .maxAge(3600); 
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/img/**")
                .addResourceLocations("file:uploads/img/");
    }
}