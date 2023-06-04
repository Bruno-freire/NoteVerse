import {push as Menu } from 'react-burger-menu'
import './index.scss'
import ListNotes from './list'
import NotesService from '../../services/notes'
import { useState } from 'react'
import { useEffect } from 'react'
import Editor from "./editor"

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({title: '', body: '', id: ''});

  async function fetchNotes() {
    const response = await NotesService.index();
    if (response.data.length >= 1) {
      setNotes(response.data.reverse())
      setCurrentNote(response.data[0])
    }else {
    setNotes([])
    setCurrentNote({title: '', body: '', id: ''})
 }
  }


  const createNote = async () => {
    await NotesService.create();
    fetchNotes()
  }

  const deleteNote = async (note) => {
    await NotesService.delete(note._id)
    fetchNotes()
  }

  const updateNote = async (params) => {
    const updatedNote = await NotesService.update(currentNote._id, params);
    const updatedNotes = notes.map((note) => {
      if (note._id === updatedNote.data._id) {
        return { ...updatedNote.data };
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
    setCurrentNote({ ...updatedNote.data });
  };
  


  const selectNote = (id) => {
    const note = notes.find((note) => note._id === id);
    setCurrentNote(note);
  };

  const updateCurrentNote = () => {
    const contentElement = document.querySelector('.ck-content');
    if (contentElement) {
      const titleElement = contentElement.firstElementChild;
      const title = titleElement.innerHTML.replace(/(<([^>]+)>)/ig, "").slice(0, 30);
      updateNote({ 'title': title, 'body': contentElement.innerHTML });
    }
  };

  useEffect(() => {
    fetchNotes()
  }, [])

  return (<>
    <main id='notes'>
      <Menu
      isOpen={props.isOpen}
      disableAutoFocus
      pageWrapId='notes-editor'
      onStateChange={(state) => props.setIsOpen(state.isOpen)}
      customBurgerIcon={false}
      customCrossIcon={false}
      outerContainerId='notes'
      >
      <ListNotes 
      notes={notes} 
      selectNote={selectNote} 
      currentNote={currentNote} 
      createNote={createNote}
      deleteNote={deleteNote}
      />
      </Menu>
      <div id="notes-editor">
        <Editor
        note={currentNote}
        updateNote={updateNote}
        />
        <button id='btnUpdate' onClick={updateCurrentNote}>Save</button>
      </div>
    </main>
  </>)
}

export default Notes;