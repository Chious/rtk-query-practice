import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from '../api/pokemonApi';

const ReduxApiProvicer = ({ children }) => {
  return <ApiProvider api={api}>{children}</ApiProvider>;
};
