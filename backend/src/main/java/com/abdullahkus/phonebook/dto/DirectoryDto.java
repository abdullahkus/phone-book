package com.abdullahkus.phonebook.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DirectoryDto {
    private Long id;
    private String firstname;
    private String lastname;
    private String phoneNumber;
}
