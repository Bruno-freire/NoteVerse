import './index.scss'
import presetantion from '../../assets/images/presentation.png'
import { NavLink } from 'react-router-dom'

const Section = () => (
  <section>
    <div className="home">
      <div className="columnLeft">
        <h1>Create notes easily<br/> and access when you wants<br/> on the cloud</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi corporis dolor modi sunt, deserunt accusamus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, architecto neque repudiandae modi doloremque consectetur.</p>
        <NavLink to='/register'>Register for free Now</NavLink>
      </div>
      <div className="columnRight">
        <img src={presetantion} alt="" />
      </div>
    </div>
  </section>
)

export default Section