import Header from "../../../components/header";
import logoImg from '../../../assets/images/logo.png'
import RegisterForm from "../../../components/auth/register_form";
import './index.scss'

const RegisterScreen = () => (
  <>
    <Header/>
    <section>
      <div className="card">
        <img src={logoImg} alt="" />
        <p>Your notes on the cloud</p>
        <RegisterForm/>
      </div>
    </section>
  </>
);

export default RegisterScreen;