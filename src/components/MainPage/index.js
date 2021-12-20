import React, {useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
import styled from "styled-components"
import TitleSection from '../ TitleSection'
import LoadingGif from '../../LoadingGif'


export default function MainPage() {
    const [movies,setMovies]=useState();
    
    useEffect(()=> {
        setTimeout(()=>{
            const promise = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");
            promise.then(answer=>setMovies(answer.data));
            promise.catch(error=>console.log(error));
        },1200)},[]);
    
    return (
        <>
        {movies?  
        <TitleSection title="Selecione um Filme" />
        : ""}
       
        <MoviesSection>
            { movies?
                movies.map(movie=> (
                    <MoviesContainer key={movie.id}>
                        <Link to={`/sessoes/${movie.id}`} >
                            <div>
                                <img src={movie.posterURL} alt={movie.title} />
                            </div>
                        </Link>
                    </MoviesContainer>
                ))
                : 
                <LoadingGif/>
            }
        </MoviesSection>
        </>
    )
}

const MoviesSection = styled.article`
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;
    
    flex-wrap: wrap;

`
const MoviesContainer = styled.section`
   img{
        width: 129px;
       padding: 10px 0 10px 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    div{
    width: 145px;

    background: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    margin: 10px;

    cursor: pointer;

    }
`
