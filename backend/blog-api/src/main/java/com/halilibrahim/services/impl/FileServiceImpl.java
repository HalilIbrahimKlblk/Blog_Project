package com.halilibrahim.services.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.halilibrahim.services.IFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class FileServiceImpl implements IFileService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String saveImage(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new RuntimeException("Yüklenen dosya boş olamaz.");
        }

        // Dosyayı doğrudan Cloudinary'ye yüklüyoruz.
        // Klasör yapısını karmaşıklaştırmadan doğrudan ana dizine ekliyoruz.
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        
        // Cloudinary bize "https://res.cloudinary.com/..." ile başlayan kalıcı ve tam bir URL döndürür.
        // Veritabanına sadece resim adını değil, bu tam URL'yi kaydediyoruz.
        return uploadResult.get("secure_url").toString();
    }
}