package com.abdullahkus.phonebook.repository;

import com.abdullahkus.phonebook.model.User;
import com.abdullahkus.phonebook.request.UserRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findAll();
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    User save(UserRequest user);
    void deleteById(Long id);
}
