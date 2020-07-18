// eslint-disable
import React from 'react';
import '../App.css';
import { Word, RandomEmoji } from '.'
import { useEventListener, useAudio } from '../hooks'
import { Tada, TryAgain } from '../audio'
import flappy2 from '../images/flappy2.png'
import bg from '../images/bg.jpg'
import pipeUpImage from '../images/pipeUp.png'
import pipeDownImage from '../images/pipeDown.png'

export function Flappy() {

  const [bgImage, setBgImage] = React.useState(null)
  const [flappy, setFlappy] = React.useState(null)


  const canvasRef = React.useRef(null)


  React.useEffect(()=> {
    

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    
    var _bgImage = new Image()
    _bgImage.src = bg
    console.log(bg)
    _bgImage.onload = ()=> {
      setBgImage(_bgImage)
    }






  },[])

  React.useEffect(()=> {
    

    if (!bgImage) return

    var flappy = new Image()
    flappy.src = flappy2
    var pipeUp = new Image()
    pipeUp.src= pipeUpImage

    var pipeDown = new Image()
    pipeDown.src = pipeDownImage

    var flappyPosition = {x: 20, y: 300}
    var pipeUpPosition = {x: 150, y: 400}
    var pipeDownPostition = {x:150, y: -200}
    console.log("hit")

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    function draw() {
      if (bgImage && bgImage.complete){
        ctx.drawImage(bgImage, 0, 0)
      }
        ctx.drawImage(flappy, flappyPosition.x, flappyPosition.y)
        ctx.drawImage(pipeUp, pipeUpPosition.x, pipeUpPosition.y )
        ctx.drawImage(pipeDown, pipeDownPostition.x, pipeDownPostition.y )


        requestAnimationFrame(draw)
    }

    draw()
  },[bgImage])


  


  return (
    <>
    hellp flappy

    <canvas id="myCanvas" width="500" height="500" ref={canvasRef}>
        Your browser does not support the canvas element.
    </canvas>
    </>
  )
}