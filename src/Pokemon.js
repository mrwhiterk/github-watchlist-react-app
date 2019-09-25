import React, { Component } from 'react';

class Pokemon extends Component {
  render() {
    let { pokemonData } = this.props;
    console.log(pokemonData.species);
    return (
      <div className="pokemon-card">
        <h1>Pokemon Page</h1>
        <h1>Name: {pokemonData.name}</h1>
        <img
          src={pokemonData.species && pokemonData.species.url}
          alt="pokemon"
        />
      </div>
    );
  }
}

export default Pokemon;
