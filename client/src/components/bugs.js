import React, {useContext } from 'react'
import { Link } from 'react-router-dom'
import { BugContext } from './BugContext'
import { UserContext } from './UserContex'
import { List, Button, Grid, Transition, Popup, Loader, Header } from 'semantic-ui-react'

function Bugs() {
  const [user, ] = useContext(UserContext)
  // consume bugs array state
  const [bugs, setBugs, loading] = useContext(BugContext)

  const handleDel = async (e) => {
    e.persist()
    const token = JSON.parse(sessionStorage.getItem('token'))
    const id = e.target.closest('.item').id
    const response = await fetch(process.env.REACT_APP_APIURL+'/delete/'+id, {
      method: "delete",
      headers: { "Content-Type": "application/json", 'Authorization': token}
    })
    const res = await response.json()
    if (response.status === 403) {
      console.log(res)
    } 
    if (response.status === 200) {
      setBugs(bugs.filter(bug => bug._id !== id))
    }
    console.log(res)
  }


  return (
    <Grid.Column as='section' width={9}>
      <Transition.Group as={List} className='pad b-shadow' divided relaxed  animation='fade down' duration={300}>
        {loading ? <Loader inline='centered' size='small' /> :
          bugs.length < 1 ? <Header as='h3' textAlign='center'>No bugs</Header>
         : bugs.map(bug => {
          return (
            <List.Item as='article' key={bug._id} id={bug._id}>
              <List.Content as='small'><strong>id: {bugs.indexOf(bug)+1}</strong></List.Content>
              <List.Content as='p'><strong>{bug.summary}</strong></List.Content>
              <List.Content as='p'>{bug.description}</List.Content>
              <List.Content floated='right'>
              {!user ? <>
                <Popup
                   size='tiny' on='click'
                  trigger={<Button basic compact className='mini' color='teal' content='Close' />} 
                  content={<Link to='/login'>login</Link>}
                  position='bottom center' />
                <Popup
                   size='tiny' on='click'
                  trigger={<Button basic compact className='mini' negative color='red' content='Del' />} 
                  content={<Link to='/login'>login</Link>}
                  position='bottom center' />
                </> :
                <><Button basic compact className='mini' color='teal' content='Close' />
                  <Button basic compact className='mini' negative content='Del' onClick={handleDel}/></>}
              </List.Content>
            </List.Item>
          )
        })}
      </Transition.Group>
    </Grid.Column>     
  )
}

export default Bugs