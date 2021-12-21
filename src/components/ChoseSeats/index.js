import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingGif from '../../LoadingGif';
import TitleSection from '../ TitleSection';
import styled from "styled-components"
import ReturnButton from '../../ReturnButton';
import { useNavigate } from 'react-router-dom'

let pickedSeats = [];
export default function ChoseSeats({ setInfos, info }) {
  const { idSession } = useParams();
  const [pickSeat, setPickSeat] = useState();
  const [unavailableSeat, setUnavailableSeat] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [isFilled, setIsFilled] = useState(false);
  let numberSeat = [];
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(false);
  const data = {

  }

  const [selected, setSelected] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false]);

  useEffect(() => {
    setTimeout(() => {
      const promise = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${idSession}/seats`);
      promise.then(answer => setPickSeat(answer.data));
      promise.catch(error => console.log(error));
    }, 1200);
  }, [idSession]);
  function isClicked(index, info) {
    setErrorMessage(false);
    selected[index] = false;
    setSelected([...selected]);
    setUnavailableSeat(false);
    pickedSeats.find((item, index) => item === info.id && pickedSeats.splice(index, 1));
  }
  function selectSeat(index, info) {
    setErrorMessage(false);
    if (!info.isAvailable) {
      setUnavailableSeat(true);
      return;
    }

    info.id && pickedSeats.push(info.id);
    setUnavailableSeat(false);
    selected[index] = true;
    setSelected([...selected]);

  }

  function verifyName(e) {
    setErrorMessage(false);
    setName(e.target.value);
    if (name !== '' && cpf !== '') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }
  function verifyCpf(e) {
    setErrorMessage(false);
    setCpf(e.target.value);
    if (name !== '' && cpf !== '') {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
  }

  function verifyData() {
    selected.map((item, index) => item && numberSeat.push(index + 1));
    data.ids = pickedSeats;
    data.name = name;
    data.cpf = cpf;
    setInfos({ ...info, ids: data.ids, name: data.name, cpf: data.cpf, seats: numberSeat });
    const promise = axios.post("https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many", data);
    promise.then(answer => console.log(answer));
    promise.catch(error => console.log(error));
    console.log(numberSeat);
    if (pickedSeats.length === 0 || name === "" || cpf === "") {
      setErrorMessage(true)
      return;
    } else {
      setErrorMessage(false);
    }
    navigate('/successo');
  }

  return (
    <>
      {
        pickSeat ?
          <TitleSection title="Selecione o(s) Assento(s)" /> : ""
      }
      {pickSeat ?

        <div >
          <ReturnButton />
          {
            unavailableSeat && <UnavailableSeat>Assento Indisponível</UnavailableSeat>
          }
          <Seats >
            <section className='all-seats'>
              {
                pickSeat.seats.map((info, index) => (
                  <GetSeat
                    className='seats-appearance'
                    key={info.id}
                    isAvailable={info.isAvailable}
                    selected={selected[index]}
                    id={info.id}
                    onClick={() => selected[index] ? isClicked(index, info) : selectSeat(index, info)}
                  >{info.name}</GetSeat>
                ))
              }

            </section>
            <section className="seat-status" >
              <div className='status'>
                <div className='selected seats-appearance'></div>
                <p>Selecionado</p>
              </div>
              <div className='status'>
                <div className='available seats-appearance'></div>
                <p>Disponível</p>
              </div>
              <div className='status'>
                <div className='unavailable seats-appearance'></div>
                <p>Indisponível</p>
              </div>
            </section>
          </Seats>
          <Input>
            <div>
              <div className={errorMessage ? "error-message" : "display-none"}>Preencha os Dados Corretamente</div>
              <label htmlFor="name">Nome do Comprador</label>
              <input type="text" placeholder='Digite seu Nome' name="name" onChange={(e) => verifyName(e)} value={name} />
            </div>
            <div>

              <label htmlFor="cpf">CPF do Comprador</label>
              <input type="text" placeholder='000.000.000-00' name="cpf" onChange={(e) => verifyCpf(e)} value={cpf} />
            </div>


            <Button isFilled={isFilled} onClick={() => verifyData()}>
              <button>  Reservar Assento(s) </button>
            </Button>

          </Input>
          <Footer>
            <div className='movie-img'>
              <img src={pickSeat.movie.posterURL} alt="capa de filme" />
            </div>
            <div className='date-info'>
              <p>{pickSeat.movie.title}</p>
              <p>{pickSeat.day.weekday} - {pickSeat.day.date}</p>
            </div>
          </Footer>
        </div>
        :
        <LoadingGif />
      }
    </>

  )
}

const Seats = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 9px;
    flex-direction: column;

    .all-seats{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;

        margin: 9px;
    }

.seats-appearance{
        width: 26px;
        height:26px;

        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 12px;

        margin: 15px 4px 0 0;


        cursor: pointer;

        :hover{
            font-weight: bold;
        }

}

    section.seat-status{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;

        .status{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .selected{
            background-color: #8DD7CF;
        }
        .unavailable{
            background-color: #F7C52B;
        }
        .available{
            background-color: #C3CFD9;
        }
    }

`
const GetSeat = styled.div`
background-color: ${(props) => props.isAvailable ? "#C3CFD9" : "#F7C52B"};
background-color: ${(props) => props.selected ? "#8DD7CF" : ""};
`
const UnavailableSeat = styled.p`

    color: red;
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 15px;
    font-weight: bold;
`
const Input = styled.div`
    display: flex;
    justify-content: center;
    align-items:center;

    text-align: start;
    flex-direction: column;

    padding: 58px 0 80px 0;
    color:#293845;
    font-size: 18px;

    .error-message{
      color: red;

      margin-bottom: 15px;

      font-weight: 500;
    }
    .display-none{
      display: none;
    }
    input{
        all:unset;

        height: 50px;
        width: 350px;

        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 3px;

        margin: 9px 0 9px 0 ;

        padding: 12px;

        cursor:pointer;
    }
    a {
         text-decoration: none;
     }
    div{
        display: flex;
        justify-content: center;
        align-items: left;

        flex-direction: column;
    }
    @media(max-width:360px){
        input{ width: 260px;
        }
    }
`
const Button = styled.div` 

     background: #E8833A;
     border-radius: 3px;

     width: 225px;
     height: 45px;
     cursor:${props => props.isFilled ? "pointer" : "not-allowed"};

     margin: 27px 0 10px 0;
     button{
         all: unset;
         color: white;

         display: flex;
         justify-content: center;
         align-items: center;
     }
     :hover{
             font-weight: bold;
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
.date-info{
display: flex;
flex-direction: column;
align-items: flex-start;

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