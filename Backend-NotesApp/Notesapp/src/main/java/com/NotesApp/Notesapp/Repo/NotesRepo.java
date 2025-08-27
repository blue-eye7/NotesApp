package com.NotesApp.Notesapp.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.NotesApp.Notesapp.Entity.Notes;

@Repository
public interface NotesRepo extends JpaRepository<Notes, Long> {
	
	
}
