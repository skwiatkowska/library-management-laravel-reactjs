import "./App.css";
import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import BookSearchPage from "./components/bookSearch/BookSearchPage";
import BookInfoPage from "./components/bookInfo/BookInfoPage";
import AuthorPage from "./components/AuthorPage";
import PublisherPage from "./components/PublisherPage";
import UserPage from "./components/userInfo/UserPage";
import AuthService from "./services/AuthService";
import UserBooksPage from "./components/userBooks/UserBooksPage";

class App extends Component{
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


  render(){
  return (
    <Router>
      <div>
        <Navbar user = {this.state.user}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/books/:id" component={BookInfoPage} />
          <Route path="/books" component={BookSearchPage} />
          <Route path="/authors/:id" component={AuthorPage} />
          <Route path="/publishers/:id" component={PublisherPage} />
          <Route path="/my-profile" component={UserPage} />
          <Route path="/my-books" component={UserBooksPage} />

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
      </Router>
  );
  }
}

export default App;
