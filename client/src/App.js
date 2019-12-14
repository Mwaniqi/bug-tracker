import React from 'react';
import './App.css'
import Bugs from './components/bugs'
import AddBug from './components/addBug'
import {BugProvider} from './components/bugContext'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bug tracker</h1>
      </header>
      <BugProvider>
        <AddBug />
        <Bugs />        
      </BugProvider>
    </div>
  );
}

export default App;
