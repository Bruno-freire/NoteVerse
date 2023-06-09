import {push as Menu } from 'react-burger-menu'
import './index.scss'
import ListNotes from './list'
import NotesService from '../../services/notes'
import { useState, useEffect } from 'react'
import Editor from "./editor"
import Search from './search'

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({title: '', body: '', id: ''});
  const [query, setQuery] = useState("");   
  const [loading, setLoading] = useState(false)
  
  async function fetchNotes() {
    const response = await NotesService.index();
    if (response.data.length >= 1) {
      const newNotes = response.data.reverse()
      setNotes(newNotes)
      setCurrentNote(response.data[0])
    } else {
      setCurrentNote({title: '', body: '', id: ''})
      setNotes([]);
    }
  }

  const createNote = async () => {
    setLoading(true)
    await NotesService.create();
    await fetchNotes()
    setLoading(false)
  }

  const deleteNote = async (note) => {
    await NotesService.delete(note._id)
    await fetchNotes()
  }

  const updateNote = async (params) => {
    if(notes.length == 0){
      window.alert("Você deve criar uma nota antes de poder salvar.")
      return
    }
    const updatedNote = await NotesService.update(currentNote._id, params);
    const updatedNotes = notes.map((note) => {
      if (note._id === updatedNote.data._id) {
        return { ...updatedNote.data };
      } else {
        return note;
      }
    });
    setNotes(updatedNotes);
    setCurrentNote(updatedNote.data);
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

  const searchNotes = async (query) => {
     const response = await NotesService.search(query);
     setNotes(response.data)
   }

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
      <Search fetchNotes={fetchNotes} setQuery={setQuery} query={query} searchNotes={searchNotes}/>
      <ListNotes 
      notes={notes}
      selectNote={selectNote} 
      currentNote={currentNote} 
      loading={loading}
      createNote={createNote}
      deleteNote={deleteNote}
      />
      
      </Menu>
      <div translate='no' id="notes-editor">
        <Editor
        note={currentNote}
        updateCurrentNote={updateCurrentNote}
        />
        <button id='btnUpdate' onClick={updateCurrentNote}>Save</button>
      </div>
    </main>
  </>)
}

export default Notes;