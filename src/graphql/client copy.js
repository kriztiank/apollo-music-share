import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://apollo-music-share-online.herokuapp.com/v1/graphql',
    options: {
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),
  
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    input SongInput {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    type Query {
      queue: [Song]!
    }

    type Mutation {
      addOrRemoveFromQueue(input: SongInput!): [Song]!
    }
  `,
})

const data = {
  queue: [],
}

// DEPRECATED
client.writeData({ data })

export default client

// const client = new ApolloClient({
//   uri: 'https://apollo-music-share-online.herokuapp.com/v1/graphql',
//   cache: new InMemoryCache(),
// })

// export default client
