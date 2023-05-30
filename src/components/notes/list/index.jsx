import Moment from "moment"
import './index.scss'

const ListNotes = (props) => {
  return (
    <>
      <h2>{props.notes.length} Notes</h2>
      <div className="notesList">
        {props.notes.map((item, key) => {
          const firstLetter = item.title.charAt(0).toUpperCase();
          const titleWithoutFirstLetter = item.title.substring(1);
          const modifiedTitle = firstLetter + titleWithoutFirstLetter;
          return (<div key={key} className="noteList" onClick={() => props.selectNote(item._id)} style={item === props.currentNote ? { backgroundColor: '#e3e3e3' } : {}}>
            <h2>{modifiedTitle.replace(/(<([^>]+)>)/ig, "").substring(0, 15)}</h2>
            <p>{item.body.replace(/(<(^>]+)>)/ig, "").substring(0,30)}</p>
            <p><span>{Moment(item.createdAt).format('DD/MM')}</span></p>
          </div>)
        })}
      </div>
    </>
  )
}

export default ListNotes