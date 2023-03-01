package com.abdullahkus.phonebook.repository;

import com.abdullahkus.phonebook.model.Directory;
import com.abdullahkus.phonebook.request.DirectoryRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DirectoryRepository extends JpaRepository<Directory, Long> {
    List<Directory> findAll();
    Optional<Directory> findById(Long id);
    void deleteById(Long id);
    Directory save(DirectoryRequest request);
}
