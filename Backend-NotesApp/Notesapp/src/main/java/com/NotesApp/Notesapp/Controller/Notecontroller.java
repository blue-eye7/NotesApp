package com.NotesApp.Notesapp.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NotesApp.Notesapp.Entity.Notes;
import com.NotesApp.Notesapp.Service.Service;

@RestController
@RequestMapping("api/noteapi")
@CrossOrigin(origins = "http://localhost:3000")
public class Notecontroller {
	
	
	@Autowired Service service;
	
	@PostMapping("addnote")
	public ResponseEntity<?> addnote(@RequestBody Notes note){
		return service.addnote(note);
	}
	
	@PutMapping("/updatenote/{id}")
	public ResponseEntity<?> updateNote(@PathVariable long id, @RequestBody Notes note){
		return service.updatenote(id,note);
	}
	
	@DeleteMapping("/deletenote/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable long id) {
	    try {
	        service.deleteNote(id);
	        return ResponseEntity.ok("Note deleted successfully");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	    }
	}
	
	@GetMapping("/getnotes")
	public ResponseEntity<?> getnotes(){
		return service.getnotes();
	}

	
}
