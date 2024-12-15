import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { fakePokemonDetailData, fakePokemonListing } from '../constants/data';

type Pokemon = typeof fakePokemonDetailData;

type List = typeof fakePokemonListing;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: name => `pokemon/${name}`,
      keepUnusedDataFor: 60, // Keeps unused data in cache for 60 seconds
    }),
    getPokemonList: builder.query<List, void>({
      query: () => `pokemon?limit=10`,
      keepUnusedDataFor: 1800,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListQuery } = pokemonApi;
