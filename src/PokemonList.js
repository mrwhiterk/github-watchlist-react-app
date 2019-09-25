import React, { Component } from 'react';
import Pokemon from './Pokemon';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = '';
  }

  render() {
    console.log('from list', this.props);
    let pokemon = this.props.pokemon.map((val, i) => {
      return <Pokemon key={i} stats={val} />;
    });
    return (
      <ul>
        <li>pokemon List</li>
      </ul>
    );
  }
}

export default PokemonList;
