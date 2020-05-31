package com.example.contacts.web;

import com.example.contacts.dao.ContactRepository;
import com.example.contacts.entities.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
public class ContractRestService {

    @Autowired
    private ContactRepository contactRepository;

    @RequestMapping(value="/contacts",method= RequestMethod.GET)
    public List<Contact> getContacts()
    {
        return contactRepository.findAll();
    }

    @RequestMapping(value="/contacts/{id}",method= RequestMethod.GET)
    public Optional<Contact> getContact(@PathVariable Long id)
    {
        return contactRepository.findById(id);
    }

    @RequestMapping(value="/contacts",method= RequestMethod.POST)
    public Contact save(@RequestBody Contact c)
    {
        c.setPhoto("unknown.jpg");
        return contactRepository.save(c);
    }

    @RequestMapping(value="/contacts/{id}",method= RequestMethod.DELETE)
    public void delete(@PathVariable Long id)
    {
        contactRepository.deleteById(id);
    }

    @RequestMapping(value="/contacts/{id}",method= RequestMethod.PUT)
    public void update(@PathVariable Long id, @RequestBody Contact c)
    {
        c.setId(id);
        contactRepository.save(c);
    }

    @RequestMapping(value="/chercherContacts",method= RequestMethod.GET)
    public Page<Contact> chercher(
            @RequestParam(name ="mc", defaultValue = "") String mc,
            @RequestParam(name ="page", defaultValue = "0")int page,
            @RequestParam(name ="size", defaultValue = "5")int size)
    {
        Pageable pageable = (Pageable) PageRequest.of(page, size, Sort.unsorted());
        return contactRepository.chercher("%"+mc+"%", pageable);
    }

    @RequestMapping(path = "/contacts/photo/{id}", produces = MediaType.IMAGE_PNG_VALUE, method= RequestMethod.GET)
    public byte[] getPhoto(@PathVariable Long id) throws Exception {
        Contact c = contactRepository.findById(id).orElseGet(null);
        return Files.readAllBytes(Paths.get(System.getProperty("user.home") + "/contactApp/photo/" + c.getPhoto()));
    }
    @RequestMapping(path = "/uploadPhoto/{id}", method= RequestMethod.POST)
    public void uploadPhoto(MultipartFile file, @PathVariable Long id) throws Exception{
        Contact c = contactRepository.findById(id).get();
        c.setPhoto(file.getOriginalFilename());
        Files.write(Paths.get(System.getProperty("user.home")+"/contactApp/photo/"+c.getPhoto()),file.getBytes());
        contactRepository.save(c);
    }
}
