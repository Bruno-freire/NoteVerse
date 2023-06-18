import './index.scss'
import presetantion from '../../assets/images/presentation.png'
import { NavLink } from 'react-router-dom'

const Section = () => (
  <section>
    <div className="home">
      <div className="columnLeft">
        <h1>Create notes easily<br/> and access when you wants<br/> on the cloud</h1>
        <p>Take control of your notes with JavaScript Notes: Create, access, and organize effortlessly on the cloud.</p>
        <p>With JavaScript Notes, you can say goodbye to the limitations of traditional note taking methods. Say goodbye to lost notebooks and forgotten doodles. </p>
        <p>Our innovative cloud-based platform allows you to easily capture your thoughts, ideas and important information, ensuring they are securely stored and readily available whenever and wherever you need them.</p>
        <NavLink to='/register'>Register for free Now</NavLink>
      </div>
      <div className="columnRight">
        <img src={presetantion} alt="" />
      </div>
    </div>
  </section>
)

export default Section