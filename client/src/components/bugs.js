import React, { useState, useEffect } from 'react'

function Bugs() {
  const [bugs, setBugs] = useState([])
  // initial bugs fetch
  useEffect(() => {
    getBugs()
  }, [])

  const getBugs = async () => {
    const response = await fetch('http://localhost:5000/')
    const data = await response.json()
    if(response.status !== 200) throw (data.message)
    console.log(data)
    // update state
    setBugs(data)
  }

  if(!bugs) return <h1>No bugs found</h1>

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