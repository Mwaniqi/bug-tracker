import React, {useContext } from 'react'
import {BugContext} from './bugContext'
import { List, Button } from 'semantic-ui-react'

function Bugs() {
  // consume bugs array state
  const [bugs, setBugs] = useContext(BugContext)

  if(!bugs.length) return <h1>No bugs found</h1>

  const handleDel = async (e) => {
    e.persist()
    const id = e.target.closest('.item').id
    const response = await fetch('http://localhost:5000/delete/'+id, {
      method: "delete"
    })
    const data = await response.json()
    setBugs(bugs.filter(bug => bug._id !== id))
    console.log(data)
  }

  return (
    <List className='pad b-shadow' divided relaxed>
      {bugs.map(bug => {
        return <List.Item as='article' key={bug._id} id={bug._id}>
          <List.Content as='small'><strong>id: {bugs.indexOf(bug)+1}</strong></List.Content>
          <List.Content as='p'>{bug.description}</List.Content>
          <List.Content floated='right'>
            <Button basic compact className='mini' color='teal' content='Close' />
            <Button basic compact className='mini' negative content='Del' onClick={handleDel}/>
          </List.Content>
        </List.Item>
      })}
    </List>      
  )
}

export default Bugs