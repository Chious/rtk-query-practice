import { useState } from 'react';
import './App.css';
import {
  useGetPokemonByNameQuery,
  useGetPokemonListQuery,
} from './api/pokemonApi';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(
    undefined
  );

  const selectPokemon = (name: string | undefined) => {
    setSelectedPokemon(name);
  };

  return (
    <>
      <header>
        <h1>My Pokedex</h1>
        <main>
          {selectedPokemon ? (
            <>
              <PokemonDetails pokemonName={selectedPokemon} />
              <button onClick={() => selectPokemon(undefined)}>back</button>
            </>
          ) : (
            <PokemonList onPokemonSelected={selectPokemon} />
          )}
        </main>
      </header>
    </>
  );
}

type PokemonListProps = {
  onPokemonSelected: (name: string) => void;
};

function PokemonList({ onPokemonSelected }: PokemonListProps) {
  const { data, isLoading, isError, isSuccess } = useGetPokemonListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <article>
      <h2>Overview</h2>
      <ol start={1}>
        {data.results.map(pokemon => (
          <li key={pokemon.name}>
            <button onClick={() => onPokemonSelected(pokemon.name)}>
              {pokemon.name}
            </button>
          </li>
        ))}
      </ol>
    </article>
  );
}

const listFormatter = new Intl.ListFormat('en-GB', {
  style: 'short',
  type: 'conjunction',
});

type PokemonDetailsProps = {
  pokemonName: string;
};

function PokemonDetails({ pokemonName }: PokemonDetailsProps) {
  const { data, isLoading, isError } = useGetPokemonByNameQuery(pokemonName);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) return <div>No data available!</div>;

  return (
    <article>
      <h2>{data.name}</h2>
      <img src={data.sprites.front_default} alt={data.name} />
      <ul>
        <li>id: {data.id}</li>
        <li>height: {data.height}</li>
        <li>weight: {data.weight}</li>
        <li>
          types:
          {listFormatter.format(data.types.map(item => item.type.name))}
        </li>
      </ul>
    </article>
  );
}
