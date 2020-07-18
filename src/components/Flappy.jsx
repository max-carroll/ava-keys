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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export function Flappy() {

  const [bgImage, setBgImage] = React.useState(null)
  const [flappy, setFlappy] = React.useState(null)
  const [restart, setRestart] = React.useState(false)

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

  function getPipe(n) {
    const height = getRndInteger(100, 400)

    const distanceBetween = 250 * (n - 1)

    return {
      up : {
        x: 250 + distanceBetween, 
        y: height 
      },
      down : {
        x: 250 + distanceBetween,
        y: height - 600
      }  

    }
  }

  React.useEffect(()=> {
    if (!bgImage) return

    var flappy = new Image()
    flappy.src = flappy2
    var pipeUp = new Image()
    pipeUp.src= pipeUpImage

    var pipeDown = new Image()
    pipeDown.src = pipeDownImage

    var flappyPosition = {x: 20, y: 200}
    var pipeUpPosition = {x: 250, y: 400}
    var pipeDownPostition = {x:250, y: -200}
    var fallingSpeed = 2
    var flyingSpeed = 3

    
    var pipes = [
      getPipe(1),
      getPipe(2),
      getPipe(3),
    ]
    
    
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    
    
    window.addEventListener("keydown", ()=> {flappyPosition.y -= 40} )
    

    function draw() {
      if (bgImage && bgImage.complete){
        ctx.drawImage(bgImage, 0, 0)
      }
        ctx.drawImage(flappy, flappyPosition.x, flappyPosition.y)

        pipes.forEach(p=> {
          ctx.drawImage(pipeUp, p.up.x, p.up.y)
          ctx.drawImage(pipeDown, p.down.x, p.down.y)
        })

        // move the stuff
        flappyPosition.y += fallingSpeed
        pipeUpPosition.x -= flyingSpeed
        pipeDownPostition.x -= flyingSpeed

        pipes.forEach(p=> {p.up.x -= flyingSpeed; p.down.x -= flyingSpeed})

        if (flappyPosition.y === canvas.height - 20 ) {
          ctx.font = "50px Arial"
          ctx.fillText("GAME OVER", 150, 160)
        }else {
          requestAnimationFrame(draw)

        }
    }

    draw()
  },[bgImage, restart])


  


  return (
    <>
    hellp flappy

    <canvas id="myCanvas" width="500" height="500" ref={canvasRef}>
        Your browser does not support the canvas element.
    </canvas>
    <button onClick={() =>setRestart(v=> !v)}>restart</button>
    </>
  )
}