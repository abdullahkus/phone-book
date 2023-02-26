package com.abdullahkus.phonebook.response;

import com.abdullahkus.phonebook.model.Directory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DirectoryResponse {
    private Long id;
    private String firstname;
    private String lastname;
    private String phoneNumber;

    public DirectoryResponse(Directory directory) {
        this.id = directory.getId();
        this.firstname = directory.getFirstname();
        this.lastname = directory.getLastname();
        this.phoneNumber = directory.getPhoneNumber();
    }
}
