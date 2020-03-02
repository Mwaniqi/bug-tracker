import React, { useContext } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'
import { UserContext } from './UserContex'


function Nav(props) {
  const [user, setUser] = useContext(UserContext)
  const token = JSON.parse(sessionStorage.getItem('token'))

  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/users/logout', {
      headers: {'Authorization': token}
    })

    // const res = await response.json()
    if (response.status === 200) {
      sessionStorage.removeItem('token')
      setUser(null)
      props.history.push('/')
    }
  }

  return( 
    <nav>
      <Menu size='small' inverted secondary>
        <Menu.Item as='h3' className='brand'><Link to='/'>Bug Tracker</Link></Menu.Item>
        <Menu floated='right' inverted secondary>
        {user ? 
          <><Menu.Item>welcome {user}</Menu.Item>
            <Menu.Item
              name='logout'
              onClick={handleLogout}/>
          </>      
        :
          <Menu.Item>
            <Link to='/register'>
              <Button inverted compact size='small'>Register</Button>
            </Link>                      
            <Link to='/login'>
              <Button inverted compact size='small'>login</Button>
            </Link> 
          </Menu.Item>}
        </Menu>
      </Menu>
    </nav>
  )
}

export default withRouter(Nav)