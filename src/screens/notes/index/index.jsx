import { useState } from "react";
import HeaderLogged from "../../../components/header_logged";
import Notes from "../../../components/notes";

function NotesScreen() {
  const [isOpen, setIsOpen] = useState(false)
  return (<div style={{height: "100vh"}}>
    <HeaderLogged setIsOpen={setIsOpen} showIcons={true}/>
    <Notes setIsOpen={setIsOpen} isOpen={isOpen}/>
  </div>
  )
};

export default NotesScreen;