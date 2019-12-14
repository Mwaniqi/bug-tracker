import React, {useContext } from 'react'
import {BugContext} from './bugContext'

function Bugs() {
  // consume bugs array state
  const [bugs] = useContext(BugContext)

  if(!bugs.length) return <h1>No bugs found</h1>

  return (
    <ul>
      {bugs.map(bug => {
        return <li key={bug._id}>{bug.description}
          <br/>Assigned: {bug.assigned}
        </li>
      })}
    </ul>      
  )
}

export default Bugs