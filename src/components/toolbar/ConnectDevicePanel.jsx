import React, { useEffect } from 'react'
import styled from 'styled-components'

import { useMIDIPortsInfo } from '../../contexts/MIDIContext'

import PairDeviceButton from './PairDeviceButton'

const Panel = styled.div`
    position: absolute;
    top: 52px;
    right: 0px;
    width: 150px;
    min-height: 100px;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
`
const DirectionTitle = styled.h2`
    font-size: 12px;
    text-align: center;
    color: #777;
    text-transform: uppercase;
    margin: 3px 0;
`
const DeviceList = styled.ul`
    list-style: none;
    flex: 1;
    margin: 0;
    padding-left: 10px;
    padding-bottom: 10px;
`
const Device = styled.li`
    font-size: 12px;
    text-transform: uppercase;
`

const StyledPairDeviceButton = styled(PairDeviceButton)`    
    border-top: 1px solid #ccc;
    margin-top: auto;    
`

const ConnectDevicePanel = ({showPanel, enableBTPairing}) => {
    const {inputs, outputs} = useMIDIPortsInfo()

    useEffect(() => {
        navigator
            .bluetooth
            .getDevices()
            .then(btDevices => console.log(btDevices))
    }, [])

    return (
        <>
        {
            showPanel &&
                <Panel>
                    <DirectionTitle>Inputs</DirectionTitle>

                    <DeviceList>
                    {
                        inputs.map(device => 
                            <Device key={device.id}>{device.name}</Device>
                        )
                    }
                    </DeviceList>

                    <DirectionTitle>Outputs</DirectionTitle>

                    <DeviceList>
                    {
                        outputs.map(device => 
                            <Device key={device.id}>{device.name}</Device>
                        )
                    }
                    </DeviceList>

                    {
                        enableBTPairing && 
                            <StyledPairDeviceButton />
                    }                    
                </Panel>
        }
        </>
    )
}

export default ConnectDevicePanel
