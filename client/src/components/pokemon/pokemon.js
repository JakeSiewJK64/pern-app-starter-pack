import React, { Component } from 'react';
import './pokemon.css';

class Pokemon extends Component {

    constructor() {
        super();
        this.state = {
            pokemons: []
        };
    }

    componentDidMount() {
        fetch('/api/pokemon')
            .then(res => res.json())
            .then(pokemons => this.setState({ pokemons }, () => {
                console.log("pokemons fetched", pokemons);
            }));
    }

    render() {
        return (
            <div className="pokemon">
                <h2>Pokemon page</h2>
                <ul>

                    {
                        this.state.pokemons.map(pokemon => <li key={pokemon.id}>{pokemon.name}: {pokemon.trainer}</li>)
                    }
                </ul>
            </div>
        );
    }
}

export default Pokemon;