import React from 'react'
import styled from 'styled-components'
import loadingIcon from "./loading.gif"

export default function LoadingGif() {
    return (
        <Loading>
         <img src={loadingIcon} alt="loading" className='loading'/>
        </Loading>
    )
}

const Loading = styled.div` 
display: flex;
justify-content: center;
 .loading{
    margin-top: 40vh;
   }
`