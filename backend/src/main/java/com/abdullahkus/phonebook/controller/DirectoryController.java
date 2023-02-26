package com.abdullahkus.phonebook.controller;


import com.abdullahkus.phonebook.request.DirectoryRequest;
import com.abdullahkus.phonebook.response.DirectoryResponse;
import com.abdullahkus.phonebook.service.DirectoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/directories")
@RequiredArgsConstructor
public class DirectoryController {
    private final DirectoryService directoryService;

    @GetMapping
    public ResponseEntity<List<DirectoryResponse>> getAllDirectories() {
        List<DirectoryResponse> directories = directoryService.getAllDirectories();
        return ResponseEntity.ok(directories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DirectoryResponse> getDirectoryById(@PathVariable Long id) {
        DirectoryResponse directory = directoryService.getDirectoryById(id);
        if (directory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(directory);
    }

    @PostMapping
    public ResponseEntity<DirectoryResponse> createDirectory(@RequestBody DirectoryRequest directoryRequest) {
        DirectoryResponse directory = directoryService.createDirectory(directoryRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(directory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DirectoryResponse> updateDirectory(@PathVariable Long id, @RequestBody DirectoryRequest directoryRequest) {
        DirectoryResponse directory = directoryService.updateDirectory(id, directoryRequest);
        if (directory == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(directory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDirectory(@PathVariable Long id) {
        directoryService.deleteDirectory(id);
        return ResponseEntity.noContent().build();
    }
}
