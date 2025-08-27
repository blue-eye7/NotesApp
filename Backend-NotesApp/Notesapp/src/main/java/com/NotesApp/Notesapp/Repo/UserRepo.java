package com.NotesApp.Notesapp.Repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NotesApp.Notesapp.Entity.User;
@Repository
public interface UserRepo extends JpaRepository<User,Long> {
	
	
	
    boolean existsByEmail(String email);

    
    boolean existsByMobile(Long mobile);

  
   Optional< User> findByEmail(String email);
}
