import { gql } from '@apollo/client'

// @client annotation tells apollo to perform this query only on the client query

export const GET_QUEUED_SONGS = gql`
  query getQueuedSongs {
    queue @client {
      id
      duration
      title
      artist
      thumbnail
      url
    }
  }
`

// MOVED TO subscriptions.js
// export const GET_SONGS = gql`
//   query getSongs {
//     songs(order_by: { created_at: desc }) {
//       artist
//       duration
//       id
//       thumbnail
//       title
//       url
//     }
//   }
// `
