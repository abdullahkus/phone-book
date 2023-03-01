package com.abdullahkus.phonebook.model;

import com.abdullahkus.phonebook.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;
    @NotEmpty(message = "First name cannot be empty.")
    @Size(min = 2, message = "The first name must be at least 2 characters.")
    @NotNull(message = "First name is mandatory")
    private String firstname;

    @NotEmpty(message = "Last name cannot be empty.")
    @Size(min = 2, message = "The last name must be at least 2 characters.")
    @NotNull(message = "Last name is mandatory")
    private String lastname;

    @Email(message = "You must enter a valid email.")
    private String email;

    @Size(min = 8, message = "The last name must be at least 8 characters.")
    private String password;

    private boolean enabled;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Directory> directories = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
