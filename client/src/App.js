import React from 'react';
import './App.css'
import Bugs from './components/bugs'
import AddBug from './components/addBug'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bug tracker</h1>
      </header>
      <AddBug />
      <Bugs />
    </div>
  );
}

export default App;
