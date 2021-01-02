import React from 'react'

const inactiveColor = '#535353'
const activeMainColor = 'darkgreen'
const activeAccentColor = 'lightgreen'

const PianoIcon = ({active}) => {
    const strokeColor = active ? activeMainColor : inactiveColor
    const fillColor = active ? activeMainColor : 'none'
    const accentColor = active ? activeAccentColor : inactiveColor

    return (
        <svg aria-hidden="true" width="29px" height="29px" viewBox="0 0 60 60" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g stroke={strokeColor} strokeWidth="2" strokeLinejoin="round">
                    <path strokeLinecap="round" fill={fillColor} d="M37.5,40 L21,40 L0,40 L0,15 C0,6.71572875 6.71572875,0 15,0 C23.2842712,0 24.5074673,8.22688484 29.437088,12.6772451 C34.3667088,17.1276054 39.8866582,16 41,16 C47.627417,16 53,21.372583 53,28 L53,40 L37.5,40 Z"></path>
                    <path strokeLinecap="round" stroke={accentColor} d="M6.13015603,8.18547977 C4.80135138,9.7538888 4,11.7833616 4,14"></path>
                    <rect strokeLinecap="round" x="1" y="39" width="51" height="12"></rect>
                    <path strokeLinecap="round" d="M21,40.0082634 L21,46.0024989"></path>
                    <path strokeLinecap="round" d="M30,40.0082634 L30,46.0024989"></path>
                    <path strokeLinecap="round" d="M7,40.0082634 L7,46.0024989"></path>
                    <path strokeLinecap="round" d="M24,40.0082634 L24,46.0024989"></path>
                    <path strokeLinecap="round" d="M33,40.0082634 L33,46.0024989"></path>
                    <path strokeLinecap="round" d="M40,40.0082634 L40,46.0024989"></path>
                    <path strokeLinecap="round" d="M43,40.0082634 L43,46.0024989"></path>
                    <path strokeLinecap="round" d="M10,40.0082634 L10,46.0024989"></path>
                    <path strokeLinecap="round" d="M46,40.0082634 L46,46.0024989"></path>
                    <path strokeLinecap="round" d="M13,40.0082634 L13,46.0024989"></path>
                    <path strokeLinecap="square" d="M4,15 L4,23"></path>
                </g>
            </g>
        </svg>
    )
}

export default PianoIcon
