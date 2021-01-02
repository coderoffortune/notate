import styled from 'styled-components'

const Button = styled.button`
    border: none;
    background: none;
    box-shadow: none;
    min-width: 40px;
    height: 40px;
    padding: 5px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 12px;
    color: blue;
    cursor: pointer;
    font-weight: 100;
    
    &:active,
    &:focus {
        outline: none;
    }
`

export default Button