package com.halilibrahim.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // Spring Security'e WebConfig dosyasındaki CORS ayarlarını kullanmasını bildirir
            .csrf(csrf -> csrf.disable()) // Geliştirme aşamasında CSRF korumasını kapatır
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()); // Şimdilik tüm isteklere yetki kısıtlaması olmadan izin verir
            
        return http.build();
    }
}