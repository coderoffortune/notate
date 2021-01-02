import React from 'react'

import Button from '../styled/Button'

const MIDI_SERVICE_UID = "03b80e5a-ede8-4b33-a751-6ce34ec4c700"
const MIDI_CHAR_DATAIO = "7772e5db-3868-4112-a1a9-f2669d106bf3"

const handleNotifications = (event) => {
    let act = event.target.value.getUint8(2);
    let note = event.target.value.getUint8(3);				
    let vel = event.target.value.getUint8(4);

    console.log(act, note, vel);				  
}

const PairDeviceButton = ({className}) => {
    var bleservice = null
    var mididataio;

    const onClick = () => {
        navigator.bluetooth.requestDevice({
            filters: [{ services: [MIDI_SERVICE_UID] }]
        })
        .then(device => {
            var server = device.gatt.connect()

            return server
        })
        .then(server => server.getPrimaryService(MIDI_SERVICE_UID))
        .then(service => {
            bleservice = service;
            return bleservice.getCharacteristic(MIDI_CHAR_DATAIO);
        })				
        .then(characteristic => {
            mididataio = characteristic;
            return mididataio.startNotifications();
        })
        .then(_ => {
            console.log('> Notifications started');
            mididataio.addEventListener('characteristicvaluechanged', handleNotifications);
        })
        .catch(error => {

        });
    }

    return (
        <Button onClick={onClick} className={className}>Pair</Button>
    )
}

export default PairDeviceButton
