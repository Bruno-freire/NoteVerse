import {push as Menu } from 'react-burger-menu'
import './index.scss'

const Notes = (props) => {
  return (<>
    <main id='notes'>
      <Menu
      isOpen={props.isOpen}
      disableAutoFocus
      onStateChange={(state) => props.setIsOpen(state.isOpen)}
      customBurgerIcon={false}
      customCrossIcon={false}
      outerContainerId='notes'
      >
        <h1>olá mundo</h1>

      </Menu>
    </main>
  </>)
}

export default Notes