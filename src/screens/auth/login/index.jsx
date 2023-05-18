import Header from "../../../components/header";
import logoImg from '../../../assets/images/logo.png'
import RegisterForm from "../../../components/auth/register_form";
import './index.scss'
import LoginForm from "../../../components/auth/users_form";

const LoginScreen = () => (
  <>
    <Header/>
    <section>
      <div className="card">
        <img src={logoImg} alt="" />
        <p>Your notes on the cloud</p>
        <LoginForm/>
      </div>
    </section>
  </>
);

export default LoginScreen;