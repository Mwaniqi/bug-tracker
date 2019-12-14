import React, {useContext } from 'react'
import {BugContext} from './bugContext'
import { List, Button } from 'semantic-ui-react'

function Bugs() {
  // consume bugs array state
  const [bugs] = useContext(BugContext)

  if(!bugs.length) return <h1>No bugs found</h1>

  return (
    <List className='pad b-shadow' divided relaxed>
      {bugs.map(bug => {
        return <List.Item as='article' key={bug._id}>
          <List.Content>{bug.description}</List.Content>
          <List.Content floated='right'>
            <Button basic compact color='teal' content='Close' />
            <Button basic compact negative content='Del' />
          </List.Content>
        </List.Item>
      })}
    </List>      
  )
}

export default Bugs