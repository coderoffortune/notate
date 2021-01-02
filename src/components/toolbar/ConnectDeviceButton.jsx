import React, { useState } from 'react'
import styled from 'styled-components'

import { useIsMIDIAvailable } from '../../contexts/MIDIContext'

import PianoIcon from '../icons/PianoIcon'

import Button from '../styled/Button'
import ConnectDevicePanel from './ConnectDevicePanel'

const ConnectDeviceItem = styled.div`
    margin-left: auto;
`

const ConnectDeviceButton = () => {
    const [showPanel, setShowPanel] = useState(true)
    const isMIDIAvailable = useIsMIDIAvailable()

    const onClick = () => setShowPanel(!showPanel)

    return (
        <ConnectDeviceItem>            
            <Button onClick={onClick} ariaLabel="Toggle MIDI devices list">
                <PianoIcon active={isMIDIAvailable} />
            </Button>
            <ConnectDevicePanel showPanel={showPanel} enableBTPairing={false} />        
        </ConnectDeviceItem>
    )
}

export default ConnectDeviceButton
