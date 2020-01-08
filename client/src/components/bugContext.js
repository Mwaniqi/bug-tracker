import React, { useState, useEffect, createContext } from 'react'
// create context and pass state to components
export const BugContext = createContext()

export const BugProvider = (props) => {
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
    if(!data.length) return <h1>No bugs found</h1>
    // update state
    setBugs(data)
  }

  return (
    // pass the state to every contained component
    <BugContext.Provider value={[bugs, setBugs]}>
      {props.children}
    </BugContext.Provider>
  )
}