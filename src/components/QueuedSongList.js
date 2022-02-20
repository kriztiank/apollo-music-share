import React from 'react'
import {
  Avatar,
  IconButton,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

export default function QueuedSongList() {
  const greatherThanMd = useMediaQuery(theme => theme.breakpoints.up('md'))

  const song = {
    title: 'MÖÖN',
    artist: 'LÜNE',
    thumbnail: 'https://img.youtube.com/vi/--ZtUFsIgMk/0.jpg',
  }

  return greatherThanMd && (
    <div style={{ margin: '10px 0' }}>
      <Typography color='textSecondary' variant='button'>
        QUEUE (5)
      </Typography>
      {Array.from({ length: 5 }, () => song).map((song, i) => (
        <QueuedSong key={i} song={song} />
      ))}
    </div>
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
  const { thumbnail, artist, title } = song

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
      <IconButton>
        <Delete color='error' />
      </IconButton>
    </div>
  )
}
