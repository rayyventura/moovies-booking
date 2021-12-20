import React from 'react'
import Return from "./back.png"
import styled from "styled-components"

export default function ReturnButton() {
    return (
        <ReturnIcon onClick={()=>window.history.go(-1)}>
            <img src={Return} alt="Símbolo de Retorno" />
        </ReturnIcon>
    )
}

const ReturnIcon = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

position: fixed;
top: 0;

padding: 20px 0 10px 9px;

z-index: 2;

cursor: pointer;
img{
    width: 22px;
}
`
