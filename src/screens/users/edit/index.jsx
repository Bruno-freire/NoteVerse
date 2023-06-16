import { Link } from "react-router-dom";
import HeaderLogged from "../../../components/header_logged";
import UsersDelete from "../../../components/user/userDelete";
import FormEditUser from "../../../components/user/userEditForm";
import FormEditPasswordUser from "../../../components/user/userEditPasswordForm";
import "./index.scss"
import { useState } from "react";

const UsersEditScreen = () => {
  const [changeName, setChangeName] = useState(false)
    return <>
      <HeaderLogged showIcons={false} setChangeName={setChangeName} changeName={changeName}/>
      <div id="mainUserEdit">
        
        <div className="cards">
        <Link id="linkBack" to="/notes">Back</Link>
          <FormEditUser setChangeName={setChangeName}/>
          <FormEditPasswordUser/>
          <UsersDelete/>
        </div>
      </div>
    </>
};

export default UsersEditScreen;