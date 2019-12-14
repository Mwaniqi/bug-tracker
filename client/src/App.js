import React from 'react';
import './App.css'
import { Grid } from 'semantic-ui-react'
import Bugs from './components/bugs'
import AddBug from './components/addBug'
import {BugProvider} from './components/bugContext'
import Nav from './components/nav'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <main className='main-container'>
        <BugProvider>
          <Grid columns='equal' padded stackable centered>
            <Grid.Row>
              <Grid.Column as='section' centered='true' width={7}>
                <AddBug />
              </Grid.Column>
              <Grid.Column as='section' centered='true' width={9}>
                <Bugs />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </BugProvider>
      </main>
    </div>
  );
}

export default App;
