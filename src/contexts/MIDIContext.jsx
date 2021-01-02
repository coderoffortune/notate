import React, { createContext, useContext, useEffect, useReducer } from "react"

import MIDI_Notes from '../data/MIDINotes'

let streamSubscribers = {}

const subscribeMIDIStream = (fn) => {
    const fnIndex = Object.keys(streamSubscribers).length
    
    streamSubscribers[fnIndex] = fn

    return () => {
        delete streamSubscribers[fnIndex]

        console.log(streamSubscribers)
    }
}

const publishMIDIPacket = (data) => {
    for (let subscriber of Object.values(streamSubscribers)) {
        subscriber(data)
    }
}

const initialContextValue = {
    inputs: [],
    outputs: [],
    notes: []
}

const MIDIContext = createContext(initialContextValue)

const isNoteOff = act => act >= 128 && act < 144
const isNoteOn = act => act >=144 && act < 160

const onMidiMessage = (dispatch) => (event) => {
    let act = event.data[0];
    let key = event.data[1];
    let vel = event.data[2];

    const note = {
        state: isNoteOn(act) ? 'ON' : 'OFF',
        key: MIDI_Notes[key],
        velocity: vel,
        timestamp: Date.now()
    }

    publishMIDIPacket(note)

    if (isNoteOn(act)) {
        dispatch({
            type: 'play_note',
            note: MIDI_Notes[key]
        })
    }

    if (isNoteOff(act)) {
        dispatch({
            type: 'stop_note',
            note: MIDI_Notes[key]
        })
    }
}

const reducer = (state, action) => {
    switch (action.type) {        
        case 'input-connected':
            if (state.inputs.find(input => input.id === action.port.id)) {
                return state
            } 

            const inputs = [...state.inputs, action.port]
            
            return {
                ...state,
                inputs,
            }
        
        case 'output-connected':
            if (state.outputs.find(output => output.id === action.port.id)) {
                return state
            } 

            const outputs = [...state.outputs, action.port]
            
            return {
                ...state,
                outputs,
            }
        
        case 'input-disconnected':
            const filteredInputs = state.inputs.filter(input => input.id !== action.port.id)
            
            return {
                ...state,
                inputs: filteredInputs,
            }
        
        case 'output-disconnected':
            const filteredOutputs = state.outputs.filter(output => output.id !== action.port.id)
            
            return {
                ...state,
                outputs: filteredOutputs,
            }

        case 'play_note': 
            const notes = state.notes[action.note] ? state.notes : [...state.notes, action.note]
            
            return {
                ...state,
                notes,
            }

        case 'stop_note': 
            const filteredNotes = state.notes.filter( note => note !== action.note )

            return {
                ...state,
                notes: filteredNotes,
            }

        default:
            return state
    }
}

const MIDIContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialContextValue);

    useEffect(() => {
        navigator.requestMIDIAccess()
        .then(function (access) {
            const inputs = Array.from(access.inputs.values());
            const outputs = Array.from(access.outputs.values());

            inputs.forEach(input => {
                dispatch({ type: 'input-connected', port: input }) 
                
                input.onmidimessage = onMidiMessage(dispatch)
            })
            outputs.forEach(output => dispatch({ type: 'output-connected', port: output }) )

            access.onstatechange = function ({port}) {
                dispatch({
                    type: `${port.type}-${port.state}`,
                    port
                })
                
                if (port.type === 'input') {
                    if (port.state === 'connected') {
                        port.onmidimessage = onMidiMessage(dispatch)
                    } else {
                        port.onmidimessage = null
                    }
                }

                console.log(port.name, port.manufacturer, port.type, port.state);
            };
        });
    }, [])

    return (
        <MIDIContext.Provider value={state}>
            { children }
        </MIDIContext.Provider>
    )
}

const MIDIContextConsumer = MIDIContext.Consumer

const useMIDIPortsInfo = () => {
    const { inputs, outputs } = useContext(MIDIContext)

    return {
        inputs,
        outputs
    }
}

const useIsMIDIAvailable = () => {
    const { inputs, outputs } = useContext(MIDIContext)

    return inputs.length > 0 || outputs.length > 0
}

const useMIDIInput = () => {
    const { notes } = useContext(MIDIContext)

    return notes
}

const useMIDIOutput = () => {
    return (note) => console.log('now playing: ', note)
}

export {
    MIDIContextProvider,
    MIDIContextConsumer,
    useMIDIPortsInfo,
    useIsMIDIAvailable,
    useMIDIInput,
    useMIDIOutput,
    subscribeMIDIStream,
}
