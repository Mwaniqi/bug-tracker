import React from 'react'
// import {Link} from 'react-router-dom'
import {List, Button} from 'semantic-ui-react'

function Nav() {
  return(
    <nav>
      <List floated='right' horizontal>
        <List.Item>
          <Button inverted compact>Register</Button>
          <Button inverted compact>Login</Button>
        </List.Item>
      </List>

      <List horizontal>
        <List.Item>
          <h2>bug tracker</h2>
        </List.Item>
      </List>
    </nav>
  )
}

export default Nav