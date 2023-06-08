import { BsXLg } from 'react-icons/all'; 
import './index.scss' 
import { useState } from 'react'; 
function Search (props) {   
  const [haveLetter, setHaveLetter] = useState(false)    
  const handleKeyDown = (e) => {     
    const disallowedKeys = ["Control", "Shift", "Tab", "CapsLock", "Alt"];     
    if (disallowedKeys.includes(e.key)) {       
      return     
    }     
    if(e.key === 'Backspace'){       
      if(props.query.length === 0 || props.query.length === 1) {         
        props.fetchNotes()         
        return       
      }     
    }else if(e.key === 'Enter'){       
      if(props.query.length === 0){         
        props.fetchNotes()         
        return       
      }     
    }     
    props.searchNotes(props.query)   
  }   
  return (     
  <div className="search">       
  <input type="text" onChange={(e) => props.setQuery(e.target.value)} onKeyDown={handleKeyDown} value={props.query} placeholder="Search note..."  />
  <BsXLg className='close' onClick={props.fetchNotes}/>     
  </div>          
  ) 
}  
export default Search;
