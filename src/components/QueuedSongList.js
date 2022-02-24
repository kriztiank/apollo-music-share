import React from 'react'
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { useMutation } from '@apollo/client'
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations'

export default function QueuedSongList({ queue }) {
  // console.log({ queue })

  const greatherThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'))

  // const song = {
  //   title: 'MÖÖN',
  //   artist: 'LÜNE',
  //   thumbnail: 'https://img.youtube.com/vi/--ZtUFsIgMk/0.jpg',
  // }

  return (
    greatherThanMd && (
      <div style={{ margin: '10px 0' }}>
        <Typography color='textSecondary' variant='button'>
          QUEUE ({queue.length})
        </Typography>
        {queue.map((song, i) => (
          <QueuedSong key={i} song={song} />
        ))}
      </div>
    )
  )
}

// makeStyles no theme
const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: '50px auto 50px',
    gridGap: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  songInfoContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  text: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
})

function QueuedSong({ song }) {
  const classes = useStyles()
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    },
  })
  const { thumbnail, artist, title } = song

  function handleAddOrRemoveFromQueue() {
    // __typename field which provides the name of the type we're working with
    addOrRemoveFromQueue({
      variables: { input: { ...song, __typename: 'Song' } },
    })
  }

  return (
    <div className={classes.container}>
      <Avatar className={classes.avatar} src={thumbnail} alt='Song thumbnail' />
      <div className={classes.songInfoContainer}>
        <Typography className={classes.text} variant='subtitle2'>
          {title}
        </Typography>
        <Typography
          className={classes.text}
          color='textSecondary'
          variant='body2'
        >
          {artist}
        </Typography>
      </div>
      <IconButton onClick={handleAddOrRemoveFromQueue}>
        <Delete color='error' />
      </IconButton>
    </div>
  )
}
