import React from 'react'
import TitleSection from '../ TitleSection'
import styled from 'styled-components'
import ReturnButton from '../../ReturnButton'

export default function SuccessPage({data}) {
    
    return (
        <>
        <SuccessTitle>
            <TitleSection 
            title="Pedido feito com sucesso!"
            />
        </SuccessTitle>
        <ReturnButton />
        <Container >
            <div className="data-container">
                <div className="data-title">
                    <p>Filme e sessão</p>
                </div>
                <div className="details">
                    <p>{data.title}</p>
                </div>
                <div className="details">
                    <p>{ `${data.weekday} ${data.date} - ${data.time}`}</p>
                </div>
            </div>
            <div className="data-container">
                <div className="data-title">
                    <p>Ingressos</p>
                </div>
                <div className="details">
                    { data &&
                        data.ids.map(seat=>(
                            <p key={seat}>{`Assento ${seat}`}</p>
                        ))
                    }
                </div>
                
            </div>
            <div className="data-container">
                <div className="data-title">
                    <p>Comprador</p>
                </div>
                <div className="details">
                    <p>{`Nome : ${data.name}`}</p>
                </div>
                <div className="details">
                    <p>{`CPF : ${data.cpf}`}</p>
                </div>
            </div>
                
                    <Button  onClick={()=> window.location.href='/'}>
                                <button>  Home </button>
                    </Button>
               
        </Container>
        </>
    )
}

const SuccessTitle=styled.div`
font-size: 25px;
color: #247A6B;

div {
    color:#247A6B;
}
p{
    font-weight:600;
}
`
const Container =  styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding:30px;
    .data-title{
        font-size: 24px;
        font-weight: bold;

        color: #293845;
        p{
            text-align: left;
        }
    }
    div.data-container{
        margin-bottom: 40px;
    }
    .details{
    font-size:18px;

    padding: 18px 0 5px 0;

    color: #293845;
    p{
        text-align: left;
    }
}
    a{
            text-decoration: none;
        }
`
const Button =  styled.div` 
     display: flex;
     justify-content: center;
     align-items: center;

     background: #E8833A;
     border-radius: 3px;

     width: 225px;
     height: 45px;
     cursor:pointer;

     :hover{
             font-weight: bold;
         }
         
     button{
         all: unset;
         color: white;

         display: flex;
         justify-content: center;
         align-items: center;

         font-size: 18px;
         
     }
     
`