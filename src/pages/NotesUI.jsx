import React from 'react'

import { useMIDIInput } from '../contexts/MIDIContext'

import Page from '../components/styled/Page'

import NotesViewer from '../components/NotesViewer'
import ChordViewer from '../components/ChordViewer'

const sortNotes = (inverted) => {
    const multiplier = inverted ? -1 : 1

    return (a, b) => {
        if (a.octave === b.octave) return multiplier * (a.pos - b.pos)

        return multiplier * (a.octave - b.octave)
    }
}

const NotesUI = () => {
    const notes = useMIDIInput()

    return (
        <Page>
            <NotesViewer notes={[...notes].sort(sortNotes(true))} />

            <ChordViewer notes={[...notes].sort(sortNotes()).map(note => note.note)} />
        </Page>
    )
}

export default NotesUI
