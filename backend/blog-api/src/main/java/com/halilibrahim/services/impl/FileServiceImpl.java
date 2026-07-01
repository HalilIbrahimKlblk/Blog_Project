package com.halilibrahim.services.impl;

import com.halilibrahim.services.IFileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileServiceImpl implements IFileService {

    @Value("${app.upload.dir}")
    private String uploadDir;

    @Override
    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("Yüklenen dosya boş olamaz.");
        }

        // 1. Dosyanın orijinal adını al
        String originalFilename = file.getOriginalFilename();
        
        // 2. Benzersiz dosya adı üret
        String uniqueFilename = UUID.randomUUID().toString() + "_" + originalFilename;
        
        // 3. Klasör yolunu hazırla
        Path uploadPath = Paths.get(uploadDir);
        
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // 4. Dosyayı fiziksel olarak kaydet
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // 5. Yeni dosya adını döndür
        return uniqueFilename;
    }
}