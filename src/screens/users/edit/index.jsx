import { Link } from "react-router-dom";
import HeaderLogged from "../../../components/header_logged";
import UsersDelete from "../../../components/user/userDelete";
import FormEditUser from "../../../components/user/userEditForm";
import FormEditPasswordUser from "../../../components/user/userEditPasswordForm";
import "./index.scss"

const UsersEditScreen = () => (
    <>
      <HeaderLogged showIcons={false}/>
      <div id="mainUserEdit">
        
        <div className="cards">
        <Link id="linkBack" to="/notes">Back</Link>
          <FormEditUser/>
          <FormEditPasswordUser/>
          <UsersDelete/>
        </div>
      </div>
    </>
);

export default UsersEditScreen;