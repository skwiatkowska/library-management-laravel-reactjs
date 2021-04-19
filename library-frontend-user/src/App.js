import './App.css';
import Home from './components/Home'
import BookSearchForm from './components/books/BookSearchForm'
import Register from './components/Register'
import Login from './components/Login'

import Navbar from './components/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
        <div>
          
          <Navbar></Navbar>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/books' component={BookSearchForm} />
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />

          </Switch>
        </div>
      </Router>
  );
}

export default App;
