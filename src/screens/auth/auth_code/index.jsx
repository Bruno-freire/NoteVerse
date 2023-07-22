import Header from "../../../components/header";
import logoImg from '../../../assets/images/logo.png'
import AuthForm from "../../../components/auth/auth_code";

const AuthCodeScreen = () => (
  <>
    <Header/>
    <section>
      <div className="card">
        <img src={logoImg} alt="" />
        <p>Your notes on the cloud</p>
        <AuthForm/>
      </div>
    </section>
  </>
);

export default AuthCodeScreen;