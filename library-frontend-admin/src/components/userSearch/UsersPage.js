import React, { Component } from 'react';
import UserSearchForm from './UserSearchForm';
import UsersTable from './UsersTable';
import UserService from '../../services/UserService';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  fetchUsers(searchIn = null, phrase = null) {
    UserService.getUsers(searchIn, phrase)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          users: result,
        });
      });

  }

  componentDidMount() {
    this.fetchUsers();
  }

  handle = (e) => {
    this.fetchUsers(e.searchIn, e.phrase);
  };

  render() {
    const { users } = this.state;
    return (
      <div className="container ">
        <UserSearchForm handle={this.handle} />
        <UsersTable users={users} />
      </div>
    )
  }
}

export default UserPage