import React from 'react';
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register'
import Login from './components/Login'
import { UserProvider } from './components/UserContex'

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
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
          <Route path='*' component={() => '404 Not Found'} />
        </Switch>
      </main>
    </div>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
