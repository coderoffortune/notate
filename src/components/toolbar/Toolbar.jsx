import React from 'react'
import { Link, useLocation } from "react-router-dom"
import styled from 'styled-components'

import ConnectDeviceButton from './ConnectDeviceButton'

const Container = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ccc;    
`

const Menu = styled.nav`
    list-style: none;
    display: flex;
`
const MenuItem = styled(Link)`
    margin: 0 20px;
    font-size: 13px;
    text-transform: uppercase;
    text-decoration: none;
    color: #000;

    border-bottom: 1px solid transparent;
    border-bottom-color: ${props => props.iscurrent ? '#000' : 'transparent'}
`

const Toolbar = () => {
    const location = useLocation()

    return (
        <Container>
            <Menu>
                <MenuItem to="/" iscurrent={location.pathname === '/'} >
                    Home
                </MenuItem>
                <MenuItem to="/notes" iscurrent={location.pathname === '/notes'} >
                    Notes
                </MenuItem>
                <MenuItem to="/compose" iscurrent={location.pathname === '/compose'} >
                    Compose
                </MenuItem>
            </Menu>
            <ConnectDeviceButton />
        </Container>
    )
}

export default Toolbar
