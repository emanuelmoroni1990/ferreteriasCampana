// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Item from "./components/Item";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <BrowserRouter>
        <Item id={1} nombre={"hola"} descripcion={"¿como va?"} stock={5}></Item>
        <ItemListContainer></ItemListContainer>
        {/* <NavBar></NavBar> */}
    </BrowserRouter>
  )
}

export default App;
