import {
  ApolloClient,
  InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql,
} from '@apollo/client'
import { WebSocketLink } from 'apollo-link-ws'
// import { WebSocketLink } from '@apollo/client/link/ws'
import { GET_QUEUED_SONGS } from './queries'

const client = new ApolloClient({
  link: new WebSocketLink({
    uri: 'wss://apollo-music-share-online.herokuapp.com/v1/graphql',
    options: {
      reconnect: true,
    },
  }),
  cache: new InMemoryCache(),

  // GraphQL schema defines what type of data a client can read and write to the data graph
  typeDefs: gql`
    type Song {
      id: uuid!
      title: String!
      artist: String!
      thumbnail: String!
      duration: Float!
      url: String!
    }

    # custom type "input" object that collects all of the individual arguments that you would normally pass to a mutation
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
  resolvers: {
    Mutation: {
      addOrRemoveFromQueue: (_, { input }, { cache }) => {
        // Read query
        const queryResult = cache.readQuery({
          query: GET_QUEUED_SONGS,
        })

        // Manage, update data
        if (queryResult) {
          const { queue } = queryResult
          const isInQueue = queue.some((song) => song.id === input.id)

          const newQueue = isInQueue
            ? queue.filter((song) => song.id !== input.id)
            : [...queue, input]

          // Write back to the query that we read from
          cache.writeQuery({
            query: GET_QUEUED_SONGS,
            data: {
              queue: newQueue,
            },
          })

          return newQueue
        }
        return []
      },
    },
  },
})

// DEPRECATED
// client.writeData({ data })

const hasQueue = Boolean(localStorage.getItem("queue"));

// Writing this to the client (to the cache)
client.writeQuery({
    query: gql`
      query GetQueue {
        queue
      }
    `,
    data: {
        queue: hasQueue ? JSON.parse(localStorage.getItem("queue")) : [],
    }
});


export default client
