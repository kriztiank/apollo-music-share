import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CssBaseline, MuiThemeProvider } from '@material-ui/core'
import {
  // ApolloClient,
  // InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql,
} from '@apollo/client'
import theme from './theme'
import client from './graphql/client'
// import './index.css'

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
)
