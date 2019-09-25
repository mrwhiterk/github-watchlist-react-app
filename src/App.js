import React, { Component } from 'react';
import './App.css';

import GitHubUser from './GitHubUser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      username: 'mrwhiterk',
      value: '',
      users: localStorage.getItem('users') || []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.setState({ data: JSON.parse(xhttp.response) }, () => {});
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
    console.log('hit', this);
    this.setState({ users: this.state.users.concat([this.state.data]) }, () =>
      localStorage.setItem('users', this.state.users)
    );
  }

  render() {
    console.log('state', this.state.users);
    return (
      <div className="App">
        <h1 className="m-5">Github WatchList</h1>
        <form className="mt-5 mb-5" onSubmit={this.handleSubmit}>
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
        <h3>Your List</h3>
      </div>
    );
  }
}

export default App;
