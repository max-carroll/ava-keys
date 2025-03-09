import {createUseStyles} from 'react-jss'
import React from 'react';
import Letter from './Letter';
const useStyles = createUseStyles({
  letter : {
    fontSize: '30rem'
  }
 })

export default function Word({word, currentPosition}) {

  const letters = word.split('')

  const classes =useStyles()
  return (
    <div className={classes.letter} >
      {
        letters.map((l,i) => <Letter letter={l} postitionInWord={i} currentPosition={currentPosition} />)
      }
    </div> 
  )
}