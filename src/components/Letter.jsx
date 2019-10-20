import {createUseStyles} from 'react-jss'
import React from 'react';
const useStyles = createUseStyles({
  letter : {
    fontSize: '15rem',
  },
  complete : {
    color: 'yellow'
  },
  uncomplete : {
    color: 'blue'
  }
  

 })

export default function Letter({letter, postitionInWord, currentPosition}) {

  const classes =useStyles()
 const style =  postitionInWord < currentPosition ? classes.complete : classes.uncomplete

 //console.log(postitionInWord, currentPosition)
  return (
    <span className={ style}>
      <span className={classes.letter} >{letter}</span> 
    </span>
  )
}