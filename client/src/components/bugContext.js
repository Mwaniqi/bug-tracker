import React, { useState, useEffect, createContext } from 'react'
// create context and pass state to components
export const BugContext = createContext()

export const BugProvider = (props) => {
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(null)

  // initial bugs fetch
  useEffect(() => {
    getBugs()
    setLoading(true)
  }, [])

  const getBugs = async () => {
    const response = await fetch(process.env.REACT_APP_APIURL)
    const data = await response.json()
    if(response.status !== 200) throw (data.message)
    // update state
    setBugs(data)
    setLoading(null)
  }

  return (
    // pass the state to every contained component
    <BugContext.Provider value={[bugs, setBugs, loading]}>
      {props.children}
    </BugContext.Provider>
  )
}