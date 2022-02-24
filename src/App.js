import React from 'react'
import AddSong from './components/AddSong'
import Header from './components/Header'
import SongList from './components/SongList'
import SongPlayer from './components/SongPlayer'
import { Grid, useMediaQuery, Hidden } from '@material-ui/core'
import songReducer from './reducer'

export const SongContext = React.createContext({
  song: {
    id: '13cbd621-6036-43f8-94b1-88f701a3bfe3',
    title: 'Eagle Eyed Tiger',
    artist: 'Fly Me To The Groove',
    thumbnail: 'http://img.youtube.com/vi/SsNW9NjE4Tk/0.jpg',
    url: 'https://www.youtube.com/watch?v=SsNW9NjE4Tk',
    duration: 209,
  },
  isPlaying: false,
})

function App() {
 const initialSongState = React.useContext(SongContext)
 const [state, dispatch] = React.useReducer(songReducer, initialSongState )
  const greatherThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const greatherThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <SongContext.Provider value={{state, dispatch}} >
      <Hidden only='xs'>
        <Header />
      </Hidden>
      <Grid container spacing={3}>
        {/* AddSong + SongList */}
        <Grid
          style={{ paddingTop: greatherThanSm ? 80 : 10 }}
          item
          xs={12}
          md={7}
        >
          <AddSong />
          <SongList />
        </Grid>
        {/* SongPlayer */}
        <Grid
          style={
            greatherThanMd
              ? {
                  position: 'fixed',
                  width: '100%',
                  right: 0,
                  top: 70,
                }
              : {
                  position: 'fixed',
                  width: '100%',
                  left: 0,
                  bottom: 0,
                }
          }
          item
          xs={12}
          md={5}
        >
          <SongPlayer />
        </Grid>
      </Grid>
    </SongContext.Provider>
  )
}

export default App
