import React from 'react';
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register'
import Login from './components/Login'
import {BugProvider} from './components/BugContext'

function App() {
  return (
    <BrowserRouter>
    <BugProvider>
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <main className='main-container'>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </main>
    </div>
    </BugProvider>
    </BrowserRouter>
  );
}

export default App;
