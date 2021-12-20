import {BrowserRouter, Routes, Route} from "react-router-dom"
import React,{useState} from "react"
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import MovieTime from "./components/MovieTime";
import ChoseSeats from "./components/ChoseSeats";
import SuccessPage from "./components/SuccessPage"
import "./reset.css"
import "./style.css"

function App() {
  const [info,setInfos] = useState({});
  return (
  <BrowserRouter>
  <Header/>
    <Routes>
      <Route path="/" element={<MainPage/>}/>
      <Route path="/sessoes/:idMovie" element={<MovieTime setInfos={setInfos} data={info}/>}/>
      <Route path="/assentos/:idSession" element={<ChoseSeats setInfos={setInfos} info={info}/>}/>
      <Route path="/sucesso" element={<SuccessPage data={info} />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
