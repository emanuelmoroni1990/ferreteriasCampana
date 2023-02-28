// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import LandingPage from "./components/LandingPage";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetail from "./components/ItemDetail";
import ItemDetailContainer from "./components/ItemDetailContainer";

function App() {
  return (
    <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<LandingPage></LandingPage>}></Route>
          <Route exact path="/ListadoProductos" element={<ItemListContainer></ItemListContainer>}></Route>
          <Route exact path="/MarcasProductos/:marca" element={<ItemListContainer></ItemListContainer>}></Route>
          <Route exact path="/item/:id" element={<ItemDetailContainer></ItemDetailContainer>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
