import { Link } from "react-router-dom";
import HeaderLogged from "../../../components/header_logged";
import UsersDelete from "../../../components/user/userDelete";
import FormEditUser from "../../../components/user/userEditForm";
import FormEditPasswordUser from "../../../components/user/userEditPasswordForm";
import "./index.scss"
import { useEffect, useState } from "react";

const UsersEditScreen = () => {
  const [nameInitial, setName] = useState('')

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    const regex = /^(\S+)/;
    const match = name.match(regex);
    const nameMatch = match ? match[0] : "";
    setName(nameMatch);
  }, []);
  

    return <>
      <HeaderLogged showIcons={false} name={nameInitial}/>
      <div id="mainUserEdit">
        
        <div className="cards">
        <Link id="linkBack" to="/notes">Back</Link>
          <FormEditUser setName={setName}/>
          <FormEditPasswordUser/>
          <UsersDelete/>
        </div>
      </div>
    </>
}

export default UsersEditScreen;