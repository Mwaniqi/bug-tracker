import React from 'react'
import {Link} from 'react-router-dom'
import {List, Button} from 'semantic-ui-react'

function Nav() {
  return(
    <nav>
      <List horizontal>
        <List.Item>
          <Link to='/'>
            <h2>bug tracker</h2>
          </Link>
        </List.Item>
      </List>
      
      <List floated='right' horizontal>
        <List.Item>
          <Link to='/register'>
            <Button inverted compact>Register</Button>
          </Link>
          <Link to='/login'>
            <Button inverted compact>Login</Button>
          </Link>
        </List.Item>
      </List>
    </nav>
  )
}

export default Nav