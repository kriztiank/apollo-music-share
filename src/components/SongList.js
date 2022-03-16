import React from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { Pause, PlayArrow, Save, Delete } from '@material-ui/icons'
import { SongContext } from '../App'
import { useSubscription, useMutation } from '@apollo/client'
import { GET_SONGS } from '../graphql/subscriptions'
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations'
import { DELETE_SONG } from '../graphql/mutations'

export default function SongList() {
  const { data, loading, error } = useSubscription(GET_SONGS)

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}
      >
        <CircularProgress />
      </div>
    )
  }
  if (error) return <div>Error fetching songs</div>

  return (
    <div>
      {data.songs.map((song) => (
        <Song key={song.id} song={song} />
      ))}
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(3),
  },
  songInfoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  songInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  thumbnail: {
    objectFit: 'cover',
    width: 140,
    height: 140,
  },
}))

function Song({ song }) {
  const { id } = song
  const classes = useStyles()
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    },
  })
  const { state, dispatch } = React.useContext(SongContext)
  const [currentSongPlaying, setCurrentSongPlaying] = React.useState(false)
  const { title, artist, thumbnail } = song
  const [deleteSong] = useMutation(DELETE_SONG)

  React.useEffect(() => {
    const isSongPlaying = state.isPlaying && id === state.song.id
    setCurrentSongPlaying(isSongPlaying)
  }, [id, state.song.id, state.isPlaying])

  function handleTogglePlay() {
    dispatch({ type: 'SET_SONG', payload: { song } })
    // conditionally dispatch a type
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
  }

  function handleAddOrRemoveFromQueue() {
    // __typename field which provides the name of the type we're working with
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: 'Song' } },
    })
  }

  async function handleDeleteSong({ id }) {
    const isConfirmed = window.confirm('Do you want to delete this song?')
    if (isConfirmed) {
      const data = await deleteSong({
        variables: { id },
        // update: (cache) => {
        //   const prevData = cache.readQuery({ query: GET_SONGS })
        //   const newTodos = prevData.todos.filter((todo) => todo.id !== id)
        //   cache.writeQuery({ query: GET_SONGS, data: { todos: newTodos } })
        // },
      })
      console.log('deleted todo', data)
    }
  }

  return (
    <Card className={classes.container}>
      <div className={classes.songInfoContainer}>
        <CardMedia image={thumbnail} className={classes.thumbnail} />
        <div className={classes.songInfo}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body1' component='p' color='textSecondary'>
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleTogglePlay} size='small' color='primary'>
              {currentSongPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size='small'
              color='secondary'
            >
              <Save />
            </IconButton>
            {/* <IconButton onClick={handleDeleteSong} size='small'>
              <Delete color='error' />
            </IconButton> */}
            <IconButton  onClick={() => handleDeleteSong(song)} size='small'>
              <Delete color='error' />
            </IconButton>
          </CardActions>
        </div>
      </div>
    </Card>
  )
}
