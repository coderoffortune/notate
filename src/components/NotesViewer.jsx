import React from 'react'
import styled from 'styled-components'

const RoundBox = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 200px;
    border: 4px solid ${(props) => props.playing ? '#555' : '#888'};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const Note = styled.span`
    font-size: 32px;
    color: #333;
    font-weight: bold;
    padding: 5px 0;
`
const Octave = styled.span`
    font-size: 14px;
    font-weight: 400;
    padding-left: 3px;
`
const Message = styled.span`
    font-size: 18dpx;
    font-weight: 100;
    text-transform: uppercase;
    color: #888;
`

const NotesViewer = ({notes}) => 
    <RoundBox playing={notes.length > 0}>
        {
            notes.reverse().map( note => 
                <Note key={`${note.note}-${note.octave}`}>
                    {note.note}<Octave>({note.octave})</Octave>
                </Note>
            )
        }
        {
            !notes.length && <Message>Play a note</Message>
        }
    </RoundBox>

export default NotesViewer
