import React from 'react'
import AddSong from './components/AddSong'
import Header from './components/Header'
import SongList from './components/SongList'
import SongPlayer from './components/SongPlayer'
import { Grid, useMediaQuery, Hidden } from '@material-ui/core'

function App() {
  const greatherThanSm = useMediaQuery((theme) => theme.breakpoints.up('sm'))
  const greatherThanMd = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <>
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
    </>
  )
}

export default App
