import React, { Component } from 'react';
import GitHubUser from './GitHubUser';

class GitHubUserList extends Component {
  render() {
    let users = this.props.userList.map((val, i) => {
      return (
        <GitHubUser
          removeUser={this.props.removeUser}
          ghUserData={val}
          key={i}
        />
      );
    });
    return <div className="watchlist">{users}</div>;
  }
}

export default GitHubUserList;
