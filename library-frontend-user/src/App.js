import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import BookSearchPage from "./components/bookSearch/BookSearchPage";
import BookInfoPage from "./components/bookInfo/BookInfoPage";
import AuthorPage from "./components/AuthorPage";
import PublisherPage from "./components/AuthorPage";

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/books/:id" component={BookInfoPage} />
          <Route path="/books" component={BookSearchPage} />
          <Route path="/authors/:id" component={AuthorPage} />
          <Route path="/publishers/:id" component={PublisherPage} />

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
