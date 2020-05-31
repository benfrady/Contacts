package com.example.contacts;

import com.example.contacts.dao.ContactRepository;
import com.example.contacts.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

@SpringBootApplication
public class ContactsApplication implements CommandLineRunner {
    @Autowired
    private ContactRepository contactRepository;
    
    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(ContactsApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        repositoryRestConfiguration.exposeIdsFor(Contact.class);
       contactRepository.findAll().forEach(c->{
           if(c!=null)
           {
               if ( c.getPhoto()==null)
               {
                   c.setPhoto("unknown.jpg");
                   contactRepository.save(c);
               }
           }

        });
    }
}
