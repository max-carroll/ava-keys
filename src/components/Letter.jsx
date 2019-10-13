import {createUseStyles} from 'react-jss'
import React from 'react';
const useStyles = createUseStyles({
  letter : {
    fontSize: '30rem'
  }
 })

export default function Letter({letter}) {

  const classes =useStyles()
  return (
    <div className={classes.letter} >{letter}</div> 
  )
}