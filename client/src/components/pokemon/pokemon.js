import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/shared-components/loadingSpinner/loadingSpinner";
import "./pokemon.css";
import PokemonTable from "./table/pokemonTable";
import { Card } from "@material-ui/core";

const Pokemon = ({ setAuth }) => {
  const [pokemon, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayHeaders, setDisplayHeaders] = useState([
    {
      id: "col1",
      Header: "ID",
      accessor: "id",
      width: 20,
    },
    {
      id: "col2",
      Header: "Pokemon Name",
      accessor: "name",
      width: 40,
    },
    {
      id: "col3",
      Header: "Trainer ID",
      accessor: "trainer",
      width: 40,
    },
  ]);

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
      <div>
        <h2>Users</h2>
        <Card elevation={12} className="w-75 m-auto">
          <PokemonTable columns={displayHeaders} data={pokemon} />
        </Card>
      </div>
    );
  }
};
export default Pokemon;
