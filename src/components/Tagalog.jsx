import React from 'react'
import { Paper, Grid } from '@material-ui/core'
import { useAudio } from '../hooks'
import { ChickenIntro, CatIntro, PresentIntro, IceCreamIntro, Tada } from '../audio'


export const WordCard = ({ word }) => {

    const {play : playIntro} = useAudio(word.intro)    


    return (
        <Grid item>
        <Paper onClick={() => playIntro("")}>
            <Grid container style={{ height: 200, width: 200 }} direction="column" justify="space-around" alignItems="center">
                <Grid item>  
                    {word.tagalog}
                </Grid>

                <Grid item>
                    <span style={{ fontSize: '5rem' }} >{word.picture}</span>
                </Grid>

            </Grid>
        </Paper>
        </Grid>
    )
}


export const Tagalog = () => {


    let words = [
        {
            eng: 'chicken',
            tagalog: 'manok',
            picture: '🐔',
            intro: ChickenIntro
        },
        {
            eng: 'cat',
            tagalog: 'pusa',
            picture: '😺',
            intro: CatIntro
        },
        { tagalog: 'regalo', picture : '🎁', intro: PresentIntro},
        { tagalog: 'sorbetes', picture : '🍦', intro: IceCreamIntro},
        { tagalog: 'labi', picture : '💋'},
        { tagalog: 'princessa', picture : '👸'},
        { tagalog: 'mata', picture : '👀'},

        // Sort into categories, tags

        // (1) you click on and it tells you what it is
        // (2) Its asks you 'Nasaan ang pusa?' and you have to click it (like a quiz)
        // (3) what letter does it start with
    ]

    return (
        <>

            <Grid container direction="row" spacing={2}>
                {
                    words.map(w => <WordCard word={w} />)
                }
            </Grid>

        </>
    )
}