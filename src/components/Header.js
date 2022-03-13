import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'
import { HeadsetTwoTone } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  title: {
    marginLeft: '16px !important',
    marginLeft: theme.spacing(2),
  },
}))

export default function Header() {
  const classes = useStyles()
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <HeadsetTwoTone />
        <Typography className={classes.title} variant='h6' component='h1'>
          Apollo Music Share
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
