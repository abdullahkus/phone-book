package com.abdullahkus.phonebook.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DirectoryRequest {
    private String firstname;
    private String lastname;
    private String phoneNumber;
}
