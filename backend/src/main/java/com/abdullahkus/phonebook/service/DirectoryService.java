package com.abdullahkus.phonebook.service;

import com.abdullahkus.phonebook.model.Directory;
import com.abdullahkus.phonebook.repository.DirectoryRepository;
import com.abdullahkus.phonebook.request.DirectoryRequest;
import com.abdullahkus.phonebook.response.DirectoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DirectoryService {
    private final DirectoryRepository directoryRepository;

    public List<DirectoryResponse> getAllDirectories() {
        List<Directory> directories = directoryRepository.findAll();
        return directories.stream().map(DirectoryResponse::new).collect(Collectors.toList());
    }

    public DirectoryResponse getDirectoryById(Long id) {
        Optional<Directory> directoryOptional = directoryRepository.findById(id);
        if (directoryOptional.isPresent()) {
            Directory directory = directoryOptional.get();
            return new DirectoryResponse(directory);
        }
        return null;
    }

    public DirectoryResponse createDirectory(DirectoryRequest directoryRequestDto) {
        Directory directory = Directory.builder()
                .firstname(directoryRequestDto.getFirstname())
                .lastname(directoryRequestDto.getLastname())
                .phoneNumber(directoryRequestDto.getPhoneNumber())
                .build();
        directory = directoryRepository.save(directory);
        return new DirectoryResponse(directory);
    }

    public void deleteDirectory(Long id) {
        directoryRepository.deleteById(id);
    }

    public DirectoryResponse updateDirectory(Long id, DirectoryRequest directoryRequestDto) {
        Optional<Directory> directoryOptional = directoryRepository.findById(id);
        if (directoryOptional.isPresent()) {
            Directory directory = directoryOptional.get();
            directory.setFirstname(directoryRequestDto.getFirstname());
            directory.setLastname(directoryRequestDto.getLastname());
            directory.setPhoneNumber(directoryRequestDto.getPhoneNumber());
            directory = directoryRepository.save(directory);
            return new DirectoryResponse(directory);
        }
        return null;
    }
}
