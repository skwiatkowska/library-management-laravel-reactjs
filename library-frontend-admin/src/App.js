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
          
          <Navbar>
          <Switch>
              <Route exact path='/admin' component={Home} />
              <Route path='/admin/books' component={BookSearchForm} />
              <Route path='/admin/register' component={Register} />
              <Route path='/admin/login' component={Login} />

          </Switch>
          </Navbar>
        </div>
      </Router>
  );
}

export default App;
