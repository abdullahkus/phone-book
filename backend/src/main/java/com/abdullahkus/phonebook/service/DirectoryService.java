package com.abdullahkus.phonebook.service;

import com.abdullahkus.phonebook.model.Directory;
import com.abdullahkus.phonebook.model.User;
import com.abdullahkus.phonebook.repository.DirectoryRepository;
import com.abdullahkus.phonebook.repository.UserRepository;
import com.abdullahkus.phonebook.request.DirectoryRequest;
import com.abdullahkus.phonebook.response.DirectoryResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DirectoryService {
    private final DirectoryRepository directoryRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public List<DirectoryResponse> getAllDirectories(HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        String jwt = token.substring(7);

        String email = jwtService.extractUsername(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        List<Directory> directories = directoryRepository.findAllByUserId(user.getId());
        return directories.stream().map(DirectoryResponse::new).collect(Collectors.toList());
    }

    public DirectoryResponse getDirectoryById(Long id, HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        String jwt = token.substring(7);

        String email = jwtService.extractUsername(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Directory> directoryOptional = directoryRepository.findById(id);
        if (directoryOptional.isPresent()) {
            Directory directory = directoryOptional.get();
            if (directory.getUser().getId().equals(user.getId())) {
                return new DirectoryResponse(directory);
            } else {
                throw new IllegalArgumentException("Directory not found");
            }
        }
        return null;
    }

    public DirectoryResponse createDirectory(DirectoryRequest request, HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        String jwt = token.substring(7);

        String email = jwtService.extractUsername(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Directory directory = Directory.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .phoneNumber(request.getPhoneNumber())
                .user(user)
                .build();
        directory = directoryRepository.save(directory);
        return new DirectoryResponse(directory);
    }

    public DirectoryResponse updateDirectory(Long id, DirectoryRequest request, HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        String jwt = token.substring(7);

        String email = jwtService.extractUsername(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Directory> directoryOptional = directoryRepository.findById(id);
        if (directoryOptional.isPresent()) {
            Directory directory = directoryOptional.get();
            if (directory.getUser().getId().equals(user.getId())) {
                directory.setFirstname(request.getFirstname());
                directory.setLastname(request.getLastname());
                directory.setPhoneNumber(request.getPhoneNumber());
                directory = directoryRepository.save(directory);
                return new DirectoryResponse(directory);
            } else {
                throw new IllegalArgumentException("Directory not found");
            }
        }
        return null;
    }

    public void deleteDirectory(Long id, HttpServletRequest httpServletRequest) {
        String token = httpServletRequest.getHeader("Authorization");
        if (token == null || !token.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header");
        }
        String jwt = token.substring(7);

        String email = jwtService.extractUsername(jwt);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Optional<Directory> directoryOptional = directoryRepository.findById(id);
        if (directoryOptional.isPresent()) {
            Directory directory = directoryOptional.get();
            if (directory.getUser().getId().equals(user.getId())) {
                directoryRepository.deleteById(id);
            } else {
                throw new IllegalArgumentException("Directory not found");
            }
        }
    }
}
