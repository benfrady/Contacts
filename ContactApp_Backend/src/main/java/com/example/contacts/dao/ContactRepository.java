package com.example.contacts.dao;

import com.example.contacts.entities.Contact;
import com.fasterxml.jackson.databind.deser.impl.CreatorCandidate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("*")
public interface ContactRepository extends JpaRepository<Contact, Long>{
    @Query("select c from Contact c where c.nom like :x")
    public Page<Contact> chercher(@Param("x")String mc, Pageable pageable);
}
