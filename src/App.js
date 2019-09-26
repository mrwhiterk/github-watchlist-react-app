import React, { Component } from 'react';
import './App.css';

import GitHubUser from './GitHubUser';
import GitHubUserList from './GitHubUserList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      username: '',
      value: '',
      users: JSON.parse(localStorage.getItem('users')) || []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.setState(
          { data: JSON.parse(xhttp.response), value: '' },
          () => {}
        );
      }
    };
    xhttp.open('GET', `https://api.github.com/users/${this.state.value}`, true);
    xhttp.setRequestHeader('Access-Control-Allow-Credentials', true);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET');
    xhttp.setRequestHeader('Access-Control-Allow-Headers', 'application/json');
    xhttp.send();
  }

  addUser() {
    if (
      !this.state.users.find(user => {
        return user.login === this.state.data.login;
      })
    ) {
      this.setState(
        {
          users: this.state.users.concat([
            { ...this.state.data, isAdded: true }
          ])
        },
        () => {
          localStorage.setItem('users', JSON.stringify(this.state.users));
          this.setState({ data: '' });
        }
      );
    } else {
      alert(this.state.data.name + ' is already on your list');
    }
  }

  removeUser(username) {
    this.setState(
      { users: this.state.users.filter(x => x.login !== username) },
      () => localStorage.setItem('users', JSON.stringify(this.state.users))
    );
  }

  render() {
    return (
      <div className="App text-center">
        <h1 className="m-5">Github WatchList</h1>
        <form
          className="mt-5 mb-5"
          id="searchForm"
          onSubmit={this.handleSubmit}
        >
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <input
                className="btn btn-outline-secondary"
                type="submit"
                value="Submit"
                id="button-addon1"
                onClick={this.handleSubmit}
              />
            </div>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              className="form-control"
              placeholder="enter username"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            />
          </div>
        </form>
        {this.state.data && (
          <GitHubUser addUser={this.addUser} ghUserData={this.state.data} />
        )}
        <h3>Your List ({this.state.users.length} users)</h3>
        <GitHubUserList
          removeUser={this.removeUser}
          userList={this.state.users}
        />
      </div>
    );
  }
}

export default App;
