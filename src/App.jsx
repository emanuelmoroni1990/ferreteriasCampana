// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import LandingPage from "./components/LandingPage";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <BrowserRouter>
        <NavBar></NavBar>
        <LandingPage></LandingPage>
        {/* <ItemListContainer></ItemListContainer> */}
    </BrowserRouter>
  )
}

export default App;
