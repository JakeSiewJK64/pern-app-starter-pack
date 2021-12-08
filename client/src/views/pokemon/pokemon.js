import React, { Component, useState } from 'react';
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
                <div className="customers">
                    <h2>Customers</h2>
                    <ul>
                        {
                            data.map(customer => <li key={customer.id}>{customer.firstName} {customer.lastName}</li>)
                        }
                    </ul>
                </div>
            </div>

        );
    }
}

export default Pokemon;