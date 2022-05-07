import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloProvider, ApolloClient, InMemoryCache,createHttpLink } from '@apollo/client';
import {setContext} from '@apollo/link-context'

import './index.css';
import App from './App';
import 'antd/dist/antd.css';

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_,{headers})=> {
  const token=localStorage.getItem('jwtToken');
  return{
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
      <App />
  </ApolloProvider>
);
