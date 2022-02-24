// import React, { useContext, useState, useRef, useEffect } from 'react'
import React, { useEffect } from 'react'
import QueuedSongList from './QueuedSongList'
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { Pause, PlayArrow, SkipNext, SkipPrevious } from '@material-ui/icons'
import { SongContext } from '../App'
import { useQuery } from '@apollo/client'
import { GET_QUEUED_SONGS } from '../graphql/queries'
import ReactPlayer from 'react-player'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 15px',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  thumbnail: {
    width: 150,
  },
}))

export default function SongPlayer() {
  const { data } = useQuery(GET_QUEUED_SONGS)
  const reactPlayerRef = React.useRef()
  const { state, dispatch } = React.useContext(SongContext)
  const [played, setPlayed] = React.useState(0)
  const [playedSeconds, setPlayedSeconds] = React.useState(0)
  // Keeps track when the user seeking through the song changing the position of the slider
  const [seeking, setSeeking] = React.useState(false)
  const [positionInQueue, setPositionInQueue] = React.useState(0)
  const classes = useStyles()

  useEffect(() => {
    const songIndex = data.queue.findIndex((song) => song.id === state.song.id)

    setPositionInQueue(songIndex)
  }, [data.queue, state.song.id])

  // console.log(data.queue)

  useEffect(() => {
    const nextSong = data.queue[positionInQueue + 1]

    if (played >= 0.99 && nextSong) {
      setPlayed(0)
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } })
    }
  }, [data.queue, played, dispatch, positionInQueue])

  function handleTogglePlay() {
    // conditionally dispatch a type
    dispatch(state.isPlaying ? { type: 'PAUSE_SONG' } : { type: 'PLAY_SONG' })
  }

  function handleProgressChange(event, newValue) {
    setPlayed(newValue)
  }

  function handleSeekMouseDown() {
    setSeeking(true)
  }

  function handleSeekMouseUp() {
    setSeeking(false)
    reactPlayerRef.current.seekTo(played)
  }

  function formatDuration(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  function handlePlayNextSong() {
    const nextSong = data.queue[positionInQueue + 1]

    if (nextSong) {
      dispatch({ type: 'SET_SONG', payload: { song: nextSong } })
    }
  }

  function handlePlayPrevSong() {
    const prevSong = data.queue[positionInQueue - 1]

    // Check if it exists
    if (prevSong) {
      dispatch({ type: 'SET_SONG', payload: { song: prevSong } })
    }
  }

  return (
    <>
      <Card variant='outlined' className={classes.container}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant='h5' component='h3'>
              {state.song.title}
            </Typography>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              {state.song.artist}
            </Typography>
          </CardContent>
          {/* player controls */}
          <div className={classes.controls}>
            <IconButton onClick={handlePlayPrevSong}>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay}>
              {state.isPlaying ? (
                <Pause className={classes.playIcon} />
              ) : (
                <PlayArrow className={classes.playIcon} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong}>
              <SkipNext />
            </IconButton>
            <Typography variant='subtitle1' component='p' color='textSecondary'>
              {formatDuration(playedSeconds)}
            </Typography>
            {/* player controls end */}
          </div>
          <Slider
            // Starts seeking
            onMouseDown={handleSeekMouseDown}
            // Done seeking
            onMouseUp={handleSeekMouseUp}
            onChange={handleProgressChange}
            value={played}
            type='range'
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played)
              setPlayedSeconds(playedSeconds)
            }
          }}
          url={state.song.url}
          playing={state.isPlaying}
          hidden
        />
        <CardMedia className={classes.thumbnail} image={state.song.thumbnail} />
      </Card>
      <QueuedSongList queue={data.queue} />
    </>
  )
}
