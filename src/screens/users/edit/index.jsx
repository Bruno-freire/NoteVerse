import { Link } from "react-router-dom";
import HeaderLogged from "../../../components/header_logged";
import UsersDelete from "../../../components/user/userDelete";
import FormEditUser from "../../../components/user/userEditForm";
import FormEditPasswordUser from "../../../components/user/userEditPasswordForm";
import "./index.scss";
import { useState } from "react";

const UsersEditScreen = () => {
  const [changeName, setChangeName] = useState(false);
  return (
    <>
      <HeaderLogged
        showIcons={false}
        setChangeName={setChangeName}
        changeName={changeName}
      />
      <div id="mainUserEdit">
        <div className="component">
          <Link id="linkBack" to="/notes">
            Back
          </Link>
          <h2 id="titleCards">Personal informations</h2>
          <div className="cards">
          <FormEditUser setChangeName={setChangeName} />
          <FormEditPasswordUser />
          </div>
          <UsersDelete />
        </div>
      </div>
    </>
  );
};

export default UsersEditScreen;
