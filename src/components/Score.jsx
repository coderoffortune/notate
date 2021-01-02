import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import VexFlow from 'vexflow'

const Container = styled.div``

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF

const clefAndTimeWidth = 60

const Score = ({
    staves = [],
    clef = 'bass',
    timeSignature = '3/4',
    width = 1000,
    height = 150,
}) => {
    const container = useRef()
    let rendererRef = useRef()

    useEffect(() => {
        if (container.current === null) {
            return
        }
        
        if (!rendererRef.current) {
            rendererRef.current = new Renderer(container.current, Renderer.Backends.SVG)            
        }

        const renderer = rendererRef.current
        renderer.resize(1000, 500);
        const context = renderer.getContext();
        context.setFont("Times New Roman", 10, undefined).setBackgroundFillStyle("#eed");

        const staveWidth = (width - clefAndTimeWidth) / staves.length

        let currX = 0
        staves.forEach((notes, i) => {
        const stave = new Stave(currX, 0, staveWidth)
        if (i === 0) {
            stave.setWidth(staveWidth + clefAndTimeWidth)
            stave.addClef(clef).addTimeSignature(timeSignature)
        }
        currX += stave.getWidth()
        stave.setContext(context).draw()

        const processedNotes = notes
            .map(note => (typeof note === 'string' ? { key: note } : note))
            .map(note =>
                Array.isArray(note) ? { key: note[0], duration: note[1] } : note
            )
            .map(({ key, ...rest }) =>
                typeof key === 'string'
                    ? {
                        key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`,
                        ...rest,
                    }
                    : rest
            )
            .map(
                ({ key, keys, duration = 'q' }) =>
                    new StaveNote({
                        clef: clef,
                        keys: key ? [key] : keys,
                        duration: String(duration),
                    })
                )

                Formatter.FormatAndDraw(context, stave, processedNotes, {
                    auto_beam: true,
                })
            })
// eslint-disable-next-line
    }, [staves])

    return (
        <Container ref={container} />
    )
}

export default Score
