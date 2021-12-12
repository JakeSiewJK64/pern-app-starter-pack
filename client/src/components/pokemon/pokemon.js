import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";
import "./pokemon.css";

const Pokemon = ({ setAuth }) => {
  const [pokemon, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/pokemon", {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPokemons(data);
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="pokemon">
        <h2>Pokemon page</h2>
        <ul>
          {pokemon.map((pokemon) => (
            <li key={pokemon.id}>
              {pokemon.name}: {pokemon.trainer}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};
export default Pokemon;
