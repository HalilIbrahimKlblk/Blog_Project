package com.halilibrahim.services;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface IFileService {
    String saveImage(MultipartFile file) throws IOException;
}