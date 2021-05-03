import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Component } from 'react';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import PrivateRoute from './PrivateRoute';
import UserPage from './components/userSearch/UsersPage';
import AuthorsPage from './components/AuthorsPage';
import PublishersPage from './components/PublishersPage';
import CategoriesPage from './components/CategoriesPage';
import NewBookForm from './components/NewBookForm';
import UserInfoPage from './components/userInfo/UserInfoPage';
import ReservationsPage from './components/ReservationsPage';
import AuthService from './services/AuthService';
import BorrowingsPage from './components/BorrowingsPage';
import BookSearchPage from './components/bookSearch/BookSearchPage'
import BookInfoPage from './components/bookInfo/BookInfoPage'
import EditProfilePage from './components/userInfo/EditProfilePage';
import EditBookPage from './components/bookInfo/EditBookPage';

class App extends Component {
  state = {
    user: undefined
  }


  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        user: user,
      });
    }
  }
  render() {
    const { user } = this.state;
    return (
      <Router>
        <div>
          {!user &&
            <Route exact path="/admin/login" component={Login} />
          }
          {user &&
            < Navbar>
              <Switch>

                <PrivateRoute exact path='/admin' component={Home} />
                <PrivateRoute exact path='/admin/books/new-book' component={NewBookForm} />
                <PrivateRoute exact path='/admin/books/:id/edit' component={EditBookPage} />
                <PrivateRoute exact path='/admin/books/:id' component={BookInfoPage} />
                <PrivateRoute exact path='/admin/books' component={BookSearchPage} />
                <PrivateRoute exact path='/admin/users/:id/edit' component={EditProfilePage} />
                <PrivateRoute exact path='/admin/users/:id' component={UserInfoPage} />
                <PrivateRoute path='/admin/users' component={UserPage} />
                <PrivateRoute path='/admin/authors' component={AuthorsPage} />
                <PrivateRoute path='/admin/publishers' component={PublishersPage} />
                <PrivateRoute path='/admin/categories' component={CategoriesPage} />
                <PrivateRoute path='/admin/reservations' component={ReservationsPage} />
                <PrivateRoute path='/admin/borrowings' component={BorrowingsPage} />

              </Switch>
            </Navbar>
          }

        </div>
      </Router>
    );
  }
}

export default App;
