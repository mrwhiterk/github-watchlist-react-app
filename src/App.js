import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import Pokemon from './Pokemon';
// import PokemonList from './Pokemon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: '', img: '' };
  }

  UNSAFE_componentWillMount() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.setState({ data: JSON.parse(xhttp.response) }, () => {
          let xhttp2 = new XMLHttpRequest();
          xhttp2.onreadystatechange = () => {
            if (xhttp2.readyState === 4 && xhttp2.status === 200) {
              this.setState(
                { img: JSON.parse(xhttp2.response) },
                () => {
                  console.log('img loaded');
                },
                () => console.log(this.state)
              );
            }
          };
          xhttp2.open('GET', this.state.data.forms[0].url, true);
        });
      }
    };
    xhttp.open('GET', 'https://pokeapi.co/api/v2/pokemon/pikachu/', true);
    xhttp.setRequestHeader('Access-Control-Allow-Credentials', true);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.setRequestHeader('Access-Control-Allow-Methods', 'GET');
    xhttp.setRequestHeader('Access-Control-Allow-Headers', 'application/json');
    xhttp.send();
  }

  render() {
    return (
      <div className="App">
        <h1>PokeDex</h1>
        <Pokemon pokemonData={this.state.data} />
      </div>
    );
  }
}

export default App;
