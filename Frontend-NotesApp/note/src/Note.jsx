

import React, { useState, useEffect } from "react";
import styles from "./Note.module.css";
import axios from 'axios';
import api from "./api";
import { useNavigate } from "react-router-dom";

export default function Note() {
  const initialNote = { text: "" };
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState(initialNote);
  const [editId, setEditId] = useState(null);
  const navigate=useNavigate();

  // Fetch notes from backend (placeholder for now)
  useEffect(() => {

    async function fetch(){
    try{
    let response=await api.get('/noteapi/getnotes')

    setNotes(response.data); }
    catch{
            console.log("err...");
    }}
    fetch()
  }, []);

const addOrUpdateNote = async () => {
  if (note.text.trim() === "") return;

  if (editId) {
    // Find the existing note
    const existingNote = notes.find((n) => n.id === editId);
    if (existingNote && existingNote.text === note.text.trim()) {
      // No changes detected → Do nothing
      setEditId(null);
      setNote(initialNote);
      return;
    }

    try {
      const response = await api.put(`/noteapi/updatenote/${editId}`, {
        text: note.text
      });

      setNotes((prevNotes) =>
        prevNotes.map((n) => (n.id === editId ? response.data : n))
      );

      setEditId(null);
      setNote(initialNote);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  } else {
    try {
      const response = await api.post("/noteapi/addnote", note);
      setNotes((prevNotes) => [...prevNotes, response.data]);
      setNote(initialNote);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
};

const editNote = (n) => {
  setNote({ text: n.text });
  setEditId(n.id);
};

const deleteNote = async (id) => {
  try {
    await api.delete(`/noteapi/deletenote/${id}`);
    setNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

const handlelogout=()=>{
    localStorage.removeItem("token");
    navigate('/')
}




  return (
    <div className={styles.container}>
        <button className={styles.addButton} onClick={handlelogout} >Logout</button>
      <h1 className={styles.title}>Notes App</h1>
      <div className={styles.card}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            value={note.text}
            name="text"
            onChange={(e) =>
              setNote({ ...note, [e.target.name]: e.target.value })
            }
            placeholder="Write a note..."
            className={styles.input}
          />
          <button onClick={addOrUpdateNote} className={styles.addButton}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <ul className={styles.notesList}>
          {notes.length === 0 ? (
            <p className={styles.emptyText}>No notes yet</p>
          ) : (
            notes.map((n) => (
              <li key={n.id} className={styles.noteItem}>
                <span>{n.text}</span>
                <p><small>{n.createddate}</small></p>
                <div className={styles.actions}>
                  <button
                    onClick={() => editNote(n)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(n.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
