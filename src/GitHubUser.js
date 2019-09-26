import React, { Component } from 'react';

class GitHubUser extends Component {
  render() {
    let {
      login,
      name,
      created_at,
      avatar_url,
      company,
      location,
      blog,
      public_repos,
      public_gists,
      followers,
      following
    } = this.props.ghUserData;

    // console.log('props', this.props);
    return (
      <div className="ghuser-card row text-left">
        <div>
          <img src={avatar_url} alt="profile pic" />
        </div>
        <div>
          <h3>{name}</h3>
          <h4>{login}</h4>
          <p>Member Since: {created_at.slice(0, 10)} </p>
          <p>Company: {company || 'student'}</p>
          <p>personal site: {blog || 'n/a'}</p>
          <p>lives in {location}</p>
        </div>
        <div>
          {/* <p>
            <a href={followers_url}>Followers</a>{' '}
          </p> */}
          <p>public repos: {public_repos}</p>
          <p>public gists: {public_gists}</p>
          <p>followers: {followers}</p>
          <p>following: {following}</p>
          {!this.props.ghUserData.isAdded && (
            <button
              type="button"
              class="btn btn-success"
              onClick={this.props.addUser}
            >
              Add
            </button>
          )}
          {this.props.ghUserData.isAdded && (
            <button
              type="button"
              class="btn btn-danger"
              onClick={this.props.removeUser}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default GitHubUser;
