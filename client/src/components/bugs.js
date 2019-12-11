import React, { Component } from 'react'

class Bugs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bugs: []
    }
  }

  componentDidMount() {
    this.getBugs()
    .then(bugs => this.setState({ bugs: bugs }))
    .catch(err => console.log(err))
  }

  getBugs = async () => {
    const response = await fetch('http://localhost:5000/')
    const data = await response.json()
    if(response.status !== 200) throw (data.message)
    return data
  }

  render() {
    const { bugs } = this.state
    console.log(bugs)

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
}

export default Bugs