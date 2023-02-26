package com.abdullahkus.phonebook.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "directories")
public class Directory {

    @Id
    @GeneratedValue
    private long id;

    @NotNull(message = "First name cannot be empty.")
    @Size(min = 2, message = "The first name must be at least 2 characters.")
    @NotBlank(message = "First name is mandatory")
    private String firstname;

    @NotNull(message = "Last name cannot be empty.")
    @Size(min = 2, message = "The last name must be at least 2 characters.")
    @NotBlank(message = "Last name is mandatory")
    private String lastname;

    @NotBlank(message = "Phone number is mandatory")
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;





}
