import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import logo from "../assets/logo.png";

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getPokemon = async () => {
    const limit = 21;
    const offset = (currentPage - 1) * limit;
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    const pokemonsWithInfo = await Promise.all(
      res.data.results.map(async (pokemon) => {
        const pokemonInfo = await axios.get(pokemon.url);
        return { ...pokemon, ...pokemonInfo.data };
      })
    );
    setPokemons(pokemonsWithInfo);
  };

  useEffect(() => {
    getPokemon();
  }, [currentPage]);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      getPokemon();
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    getPokemon();
  };

  console.log(pokemons);
  return (
    <>
      <div className="flex justify-center items-center w-full">
        <img src={logo} alt="logo" />
      </div>
      <Button nextPage={nextPage} prevPage={prevPage} />
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 place-content-center mt-12">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.url}
            className="font-semibold text-2xl shadow-transparent rounded-3xl border-solid border-slate-800 border-[2px] flex flex-col justify-center p-4 m-2"
          >
            <h2>{pokemon.name}</h2>
            <div className="relative w-full flex h-48 justify-center my-4">
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-[200px]"
              />
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${pokemon.id}.gif`}
                alt={pokemon.name}
                className="absolute bottom-0 md:left-14 left-28 w-12 h-12"
              />
            </div>
            <p>weight: {pokemon.weight}</p>
          </div>
        ))}
      </div>
      <Button nextPage={nextPage} prevPage={prevPage} />
    </>
  );
};

export default Home;
