import React from 'react'
import styled from "styled-components"

export default function TitleSection({title,styling}) {
    return (
        <Title>
            <p >{title}</p>
        </Title> 
    )
}
const Title = styled.div`
    height: 110px;

    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;

    font-size: 24px;
    font-weight: 400;
    font-weight: 500;

    padding-top: 90px;

    margin-bottom: 30px;

  color: #293845;

`
