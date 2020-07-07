import React from 'react'
import { Paper, Grid, TextField, Button } from '@material-ui/core'
import { useSpeech } from '../hooks'



export const Speak = () => {

    const [text,setText] = React.useState("")

    const handleChange = event => {
        event.persist()
        setText(event.target.value)
    }

    const talk = useSpeech(text)
  

    return (
        <>


            <TextField 
              value={text} 
              onChange={handleChange}
              multiline
              rows={10}
              InputProps={{
                style: {
                   fontSize: '2rem', color: 'white'
                }
              }}
            >
            </TextField>

            <Button onClick={talk} color="primary" variant="contained">Say it</Button>

           

        </>
    )
}