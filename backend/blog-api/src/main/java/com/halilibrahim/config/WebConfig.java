package com.halilibrahim.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Uygulamadaki tüm endpointlere izin verir
                .allowedOrigins(
                    "http://localhost:5173", 
                    "http://192.168.1.106:5173"
                ) // Frontend'in çalışabileceği tüm olası IP ve origin adresleri
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // İzin verilen HTTP metotları
                .allowedHeaders("*") // Tüm header bilgilerine izin verir
                .allowCredentials(true) // Token/Cookie gibi bilgilerin taşınmasına izin verir
                .maxAge(3600); // Tarayıcının bu CORS ayarlarını 1 saat (3600 saniye) önbellekte tutmasını sağlar
    }
}