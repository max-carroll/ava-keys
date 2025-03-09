import {createUseStyles} from 'react-jss'
import React from 'react';
const useStyles = createUseStyles({
  score : {
    fontSize: '1rem',
    position: 'fixed',
    bottom: '1rem',
    right: '1rem'
  },


 })

export default function Points({score}) {

  const classes =useStyles()


 //console.log(postitionInWord, currentPosition)
  return (
    <span className={ classes.score}>
      <span>Points: </span>{score}
    </span>
  )
}