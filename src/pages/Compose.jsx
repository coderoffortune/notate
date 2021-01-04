import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { subscribeMIDIStream } from '../contexts/MIDIContext'

import Page from '../components/styled/Page'
import Score from '../components/Score'

const ComposePage = styled(Page)`
    align-items: flex-start;
    padding: 20px 0 0 20px;
`

const partiture = {
    instrument: 'piano',
    measures: [
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'C#5/q, B4, A4',
                clef: 'treble',
                timeSignature: '3/4',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
                timeSignature: '3/4',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, E3',
                clef: 'bass',
            },
        },
        {
            treble: {
                notes: 'E4/q, F4, G#4',
                clef: 'treble',
            },
            bass: {
                notes: 'C#3/q, B2, F#3',
                clef: 'bass',
            },
        },
    ],
    timeSignature: '3/4',
}

const Compose = () => {
    const [progression, updateProgression] = useState([])

    useEffect(() => {
        const unsubscribe = subscribeMIDIStream(data => {
            if (data.state === 'ON') {
                updateProgression([...progression, `${data.key.note}${data.key.octave}`])
            }
        })

        return () => unsubscribe()
    }, [progression])

    return (
        <ComposePage>
            Progression: 
            {
                progression.join(', ')
            }
            <Score partiture={partiture} />
        </ComposePage>
    )
}

export default Compose
