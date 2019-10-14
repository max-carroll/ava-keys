import {createUseStyles} from 'react-jss'
import React from 'react';
const useStyles = createUseStyles({
  letter : {
    fontSize: '30rem'
  }
 })

 const getRandomEmoji = () => {
  
  var characters       = [
    '😜', 
    '😂', 
    '😉', 
    '😁', 
    '😎',
    '👍',
    '😃',
    '🐱',
    '🐉'];

  var min=0; 
  var max=characters.length;  
  var random =  Math.floor(Math.random() * (+max - +min)) + +min; 
  const result = characters[random];
  return result  
 }

export default function RandomEmoji() {

  const emoji = getRandomEmoji()
  const classes =useStyles()
  return (
    <div className={classes.letter} >{emoji}</div> 
  )
}