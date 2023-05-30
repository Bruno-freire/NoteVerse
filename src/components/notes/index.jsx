import {push as Menu } from 'react-burger-menu'
import './index.scss'
import ListNotes from './list'
import NotesService from '../../services/notes'
import { useState } from 'react'
import { useEffect } from 'react'

const Notes = (props) => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState({title: '', body: '', id: ''});

  async function fetchNotes() {
    const response = await NotesService.index();
    if(response.data.length >= 1) {
      setNotes(response.data.reverse())
      setCurrentNote(response.data[0])
    }else {
      setNotes([])
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

  const selectNote = (id) => {
    const note = notes.find(note => {
      return note._id == id
    })
    setCurrentNote(note)
  }

  useEffect(() => {
    fetchNotes()
  }, [])
  return (<>
    <main id='notes'>
      <Menu
      isOpen={props.isOpen}
      disableAutoFocus
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
    </main>
  </>)
}

export default Notes