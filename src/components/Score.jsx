import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import VexFlow from 'vexflow'

const Container = styled.div``

const VF = VexFlow.Flow;
const { Factory, Renderer, Registry } = VF
// const {Formatter, Stave, StaveNote } = VF

const Score = ({
    staves,
    partiture
}) => {
    const container = useRef()

    useEffect(() => {        
        if (container.current === null) {
            return
        }

        const scoreHeight = 50 + 250 * Math.ceil(partiture.measures.length / 4)

        let registry = new Registry();
        Registry.enableDefaultRegistry(registry);

        let vfFactory = new Factory({
            renderer: {
                elementId: 'scoreContainer',
                backend: Renderer.Backends.SVG,
                width: 1400,
                height: scoreHeight
            }
        })
        let easyScore = vfFactory.EasyScore()
        easyScore.set({ time: partiture.timeSignature });

        const makeSystem = (index) => {
            const row = Math.floor(index / 4)
            const col = index % 4
            const width = row > 0 ? 300 : 280

            let x = row > 0 ? 40 : 120
            x += col * width
            const y = 50 + row * 250

            var system = vfFactory.System({x: x, y: y, width: width, spaceBetweenStaves: 10})
            
            return system
        }

        let system = null

        partiture.measures.forEach( (measure, index) => {
            system = makeSystem(index)

            if (measure.treble) {
                const trebleVoice = easyScore.voice(
                    easyScore.notes(measure.treble.notes, {
                        clef: measure.treble.clef,
                        time: measure.treble.timeSignature
                    })
                )

                const trebleStave = system
                    .addStave({
                        voices: [
                            trebleVoice
                        ]
                    })
                
                if (index % 4 === 0) {
                    trebleStave
                        .addClef('treble')
                        .addTimeSignature(partiture.timeSignature)
                }
            }

            if (measure.bass) {
                const bassVoice = easyScore.voice(
                    easyScore.notes(measure.bass.notes, {
                        clef: measure.bass.clef,
                        time: measure.bass.timeSignature
                    })
                )

                const bassStave = system
                    .addStave({
                        voices: [
                            bassVoice
                        ]
                    })

                if (index % 4 === 0) {
                    bassStave
                        .addClef('bass')
                        .addTimeSignature(partiture.timeSignature)
                }
            }
            
            if (index % 4 === 0) {
                system.addConnector('brace')
            }
            system.addConnector('singleRight')
            system.addConnector('singleLeft')
        })

        // staves.forEach( (stave, index) => {
        //     const staveVoices = stave.voices.map( voice => 
        //         easyScore.voice(
        //             easyScore.notes(voice.notes, {clef: stave.clef, stem: voice.stem, time: stave.timeSignature})
        //         )
        //     )

        //     system
        //         .addStave({
        //             voices: staveVoices
        //         })
        //         .addClef(stave.clef)
        //         .addTimeSignature(stave.timeSignature)

        //     if (index === 0) {
        //         system.addConnector('brace')
        //     }
        //     system.addConnector('singleRight')
        //     system.addConnector('singleLeft')
        // })
        
        vfFactory.draw()

        // const context = renderer.getContext();
        // context.setFont("Times New Roman", 10, undefined).setBackgroundFillStyle("#eed");

        // const staveWidth = (width - clefAndTimeWidth) / staves.length

        // let currX = 0
        // staves.forEach((notes, i) => {
        // const stave = new Stave(currX, 0, staveWidth)
        // if (i === 0) {
        //     stave.setWidth(staveWidth + clefAndTimeWidth)
        //     stave.addClef(clef).addTimeSignature(timeSignature)
        // }
        // currX += stave.getWidth()
        // stave.setContext(context).draw()

        // const processedNotes = notes
        //     .map(note => (typeof note === 'string' ? { key: note } : note))
        //     .map(note =>
        //         Array.isArray(note) ? { key: note[0], duration: note[1] } : note
        //     )
        //     .map(({ key, ...rest }) =>
        //         typeof key === 'string'
        //             ? {
        //                 key: key.includes('/') ? key : `${key[0]}/${key.slice(1)}`,
        //                 ...rest,
        //             }
        //             : rest
        //     )
        //     .map(
        //         ({ key, keys, duration = 'q' }) =>
        //             new StaveNote({
        //                 clef: clef,
        //                 keys: key ? [key] : keys,
        //                 duration: String(duration),
        //             })
        //         )

        //         Formatter.FormatAndDraw(context, stave, processedNotes, {
        //             auto_beam: true,
        //         })
        //     })
// eslint-disable-next-line
    }, [staves, partiture])

    return (
        <Container ref={container} id="scoreContainer" />
    )
}

export default Score
