import React,{useState, useEffect} from 'react'
import axios from "axios"
import LoadingGif from '../../LoadingGif'
import TitleSection from '../ TitleSection'
import styled from "styled-components"
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReturnButton from '../../ReturnButton'

export default function MovieTime({setInfos, data}) {
    const {idMovie}=useParams();

    const [time,setTime]=useState();
    useEffect(() => {
        setTimeout(()=> {const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${idMovie}/showtimes`);
        promise.then(answer=>setTime(answer.data));
        promise.catch(error=>console.log(error));}, 1200)
    }, []);
    return (
       <>
       {time?
        <div>
             <TitleSection title="Selecione um Horário"/>
             <ReturnButton />
             {
                 time.days.map(info=>(
                <Date key={info.id}>
                    
                        <p>{info.weekday} - {info.date}</p> 
                   
                        <div className='time-boxes'>
                        <Link to={`/assentos/${info.showtimes[0].id}`}>
                            <div onClick={()=>{setInfos({ weekday: info.weekday, date: info.date, title: time.title, time: info.showtimes[0].name});}}>{info.showtimes[0].name}</div>
                        </Link>
                        <Link to={`/assentos/${info.showtimes[1].id}`}>
                            <div onClick={()=>{setInfos({ weekday: info.weekday, date: info.date, title: time.title,time: info.showtimes[1].name});}}>{info.showtimes[1].name}</div>
                        </Link>
                        </div>
                   
                </Date>
                 ))
             }
             <Padding>
                <Footer>
                    <div className='movie-img'>
                        <img src={time.posterURL} alt="capa de filme" />
                    </div>
                    <div>
                        <p>{time.title}</p>
                    </div>
                </Footer>
             </Padding>
            
        </div>
        : 
        <LoadingGif />
    }
        </>

        
    )
}

const Date = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

p{
    padding-top: 9px;

    font-size: 20px;
    color: #293845;
}
a{
        text-decoration: none;
    }
    a:focus, a:hover, a:visited, a:link, a:active {
        text-decoration: none;
    }
.time-boxes{
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: bold;
    
    p{
        padding-top: 9px;
    }
    div{
        width: 80px;
        height: 40px;

        margin: 9px;

        color: white;
        background-color: #E8833A;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);

        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        :hover{
            font-size: 18px;
        }
    }
}
`
const Footer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;

position: fixed;
bottom: 0;
width: 100%;

background-color: #FAFAFA;
box-shadow: 0px 2px 4px 4px rgba(0, 0, 0, 0.1);

height: 80px;

.movie-img{
    width: 52px;
    height: 70px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;

    img{
        width: 42px;
        height: 60px;
    }
}
p{
    align-items: center;

    color: #293845;
    font-size: 22px;
}
div{
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 9px;
}
`
const Padding = styled.footer`
padding-top: 80px;
`