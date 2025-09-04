package com.NotesApp.Notesapp.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import com.NotesApp.Notesapp.Entity.Notes;
import com.NotesApp.Notesapp.Entity.User;
import com.NotesApp.Notesapp.Repo.NotesRepo;
import com.NotesApp.Notesapp.Repo.UserRepo;

@org.springframework.stereotype.Service
public class Service {
	
	@Autowired UserRepo userRepository;
	
	@Autowired NotesRepo noterepo;




	public ResponseEntity<?> addnote(Notes note) {
		
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		System.out.println("email---------"+email);
		User u=userRepository.findByEmail(email).orElse(null);
		u.getNotes().add(note);
		
		note.setText(note.getText());
		
		note.setUser(u);
		return ResponseEntity.ok(noterepo.save(note));
	}

	public ResponseEntity<?> updatenote(long id, Notes note) {
		
		return noterepo.findById(id).map(existingNote -> {
	        existingNote.setText(note.getText());
	        return ResponseEntity.ok(noterepo.save(existingNote));
	    }).orElseThrow(() -> new RuntimeException("Note not found"));
	}

	public void deleteNote(long id) {
	    // Fetch the note
	    Notes n = noterepo.findById(id).orElseThrow(() -> new RuntimeException("Note not found"));

	    // Remove the note from the user's list to maintain consistency
	    User user = n.getUser();
	    if (user != null) {
	        user.getNotes().remove(n);
	        n.setUser(null); // break the association
	    }

	    // Delete the note
	    noterepo.delete(n); // you can also use deleteById(id), both work
	}

	public ResponseEntity<?> getnotes() {
		String email = SecurityContextHolder.getContext().getAuthentication().getName();
		
		User u=userRepository.findByEmail(email).orElseThrow(()->new RuntimeException("user not found"));
		return ResponseEntity.ok(u.getNotes());
		
	}
	
	
	
	
	
	
}
