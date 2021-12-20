import React from 'react'
import styled from "styled-components"

export default function Header() {
    return (
       
            <HeaderTop>
                <h1>CINEFLEX</h1>
            </HeaderTop>
       
    )
}

const HeaderTop = styled.header`
height: 60px;
width: 100%;

background-color:#C3CFD9;

color:#E8833A;

box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);

font-size: 34px;
font-weight: 600;

text-align: center;

display: flex;
justify-content: center;
align-items: center;

position: fixed;
top: 0;
`