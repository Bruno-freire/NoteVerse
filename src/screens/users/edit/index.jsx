import HeaderLogged from "../../../components/header_logged";
import UsersDelete from "../../../components/user/userDelete";
import FormEditUser from "../../../components/user/userEditForm";
import "./index.scss"

const UsersEditScreen = () => (
    <>
      <HeaderLogged showIcons={false}/>
      <div id="mainUserEdit">
        <div className="cards">
          <FormEditUser/>
          <div className="card">
            <h2>Password</h2>
            <div className="cardComponent">
              <p>Users Password Edit Form</p>
            </div>
          </div>
          <UsersDelete/>
        </div>
      </div>
    </>
);

export default UsersEditScreen;