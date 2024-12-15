import { createApi } from '@reduxjs/toolkit/query';
import { fakePokemonDetailData, fakePokemonListing } from '../constants/data';

const api = createApi({
  baseQuery: () => {},
  endpoints: builder => ({
    pokemonList: builder.query({
      async queryFn() {
        return { data: fakePokemonListing };
      },
    }),
    fakePokemonDetail: builder.query({
      async queryFn() {
        return { data: fakePokemonDetailData };
      },
    }),
  }),
});

export const { usePokemonListQuery, useFakePokemonDetailQuery } = api;
export { api };
