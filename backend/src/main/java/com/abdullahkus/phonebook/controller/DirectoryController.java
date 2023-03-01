package com.abdullahkus.phonebook.controller;


import com.abdullahkus.phonebook.request.DirectoryRequest;
import com.abdullahkus.phonebook.response.DirectoryResponse;
import com.abdullahkus.phonebook.service.DirectoryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/directories")
@RequiredArgsConstructor
public class DirectoryController {
    private final DirectoryService directoryService;

    @GetMapping
    public ResponseEntity<List<DirectoryResponse>> getAllDirectories(HttpServletRequest httpServletRequest) {
        List<DirectoryResponse> directories = directoryService.getAllDirectories(httpServletRequest);
        return ResponseEntity.ok(directories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DirectoryResponse> getDirectoryById(@PathVariable Long id, HttpServletRequest httpServletRequest) {
        DirectoryResponse directory = directoryService.getDirectoryById(id, httpServletRequest);
        if (directory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(directory);
    }

    @PostMapping
    public ResponseEntity<DirectoryResponse> createDirectory(@RequestBody DirectoryRequest request, HttpServletRequest httpServletRequest) {
        DirectoryResponse directory = directoryService.createDirectory(request, httpServletRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(directory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DirectoryResponse> updateDirectory(@PathVariable Long id, @RequestBody DirectoryRequest request, HttpServletRequest httpServletRequest) {
        DirectoryResponse directory = directoryService.updateDirectory(id, request, httpServletRequest);
        if (directory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(directory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDirectory(@PathVariable Long id, HttpServletRequest httpServletRequest) {
        directoryService.deleteDirectory(id, httpServletRequest);
        return ResponseEntity.noContent().build();
    }
}
