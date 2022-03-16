import {
  // ApolloClient,
  // InMemoryCache,
  // ApolloProvider,
  // useQuery,
  gql,
} from '@apollo/client'

// Instead of using all individual arguments will bring in an input

export const ADD_OR_REMOVE_FROM_QUEUE = gql`
  mutation addOrRemoveFromQueue($input: SongInput!) {
    addOrRemoveFromQueue(input: $input) @client
  }
`

export const ADD_SONG = gql`
  mutation addSong(
    $title: String!
    $artist: String!
    $thumbnail: String!
    $duration: Float!
    $url: String!
  ) {
    insert_songs(
      objects: {
        title: $title
        artist: $artist
        thumbnail: $thumbnail
        duration: $duration
        url: $url
      }
    ) {
      affected_rows
    }
  }
`

export const DELETE_SONG = gql`
mutation deleteSong($id: uuid!) {
  delete_songs(where: {id: {_eq: $id}}) {
    returning {
      artist
    }
  }
}
`
