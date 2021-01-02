import React from 'react'
import styled from 'styled-components'
import Chords from '../data/Chords'

const Chord = styled.div`
    font-size: 22px;
    font-weight: 100;
    text-transform: uppercase;
    margin: 30px 0;
`

const testChord = (notes) => Chords[notes.join(' ')]

const ChordViewer = ({notes}) => {
    const chord = testChord(notes) 
    
    return (
        <Chord>{chord}</Chord>
    )
}

export default ChordViewer
