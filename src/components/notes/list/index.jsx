import Moment from "moment";
import { MdDelete } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import './index.scss';
import { useEffect, useState } from "react";

const ListNotes = (props) => {
  const [notes, setNotes] = useState([]);
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setNotes(props.notes);
  }, [props.notes]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstRender(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  if (!firstRender) {
    return null; // Renderiza um estado vazio ou um indicador de carregamento enquanto aguarda a primeira renderização
  }

  return (
    <>
      <div id="noteHeader">
        <h2><span>{notes.length}</span> Notes</h2>
        <button id="newNote" onClick={() => props.createNote()}>{!props.loading && 'Note +'}{props.loading && <AiOutlineLoading3Quarters id="iconLoading"/>}</button>
      </div>
      <div className="notesList">
        {notes.map((item, key) => {
          const widthTitle = item.title.length
          const firstLetter = item.title.charAt(0).toUpperCase();
          const titleWithoutFirstLetter = item.title.substring(1);
          const modifiedTitle = firstLetter + titleWithoutFirstLetter;
          return (
            <div
              key={key}
              className="noteList"
              onClick={() => props.selectNote(item._id)}
              style={item === props.currentNote ? { backgroundColor: '#e3e3e3' } : {}}
            >
              <h2>{modifiedTitle.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}</h2>
              <p>{item.body.replace(/(<([^>]+)>)/ig, "").substring(widthTitle, 35)}</p>
              <div className="dataAndBin">
                <p><span>{Moment(item.createdAt).format('DD/MM')}</span></p>
                <MdDelete onClick={() => props.deleteNote(item)} id="bin" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListNotes;
