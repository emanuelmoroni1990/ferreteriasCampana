// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import LandingPage from "./components/LandingPage";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemUpload from "./components/ItemUpload";

function App() {
  return (
    <BrowserRouter>
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<LandingPage></LandingPage>}></Route>
          <Route exact path="/ListadoProductos" element={<ItemListContainer></ItemListContainer>}></Route>
          <Route exact path="/MarcasProductos/:marca" element={<ItemListContainer></ItemListContainer>}></Route>
          <Route exact path="/item/:id" element={<ItemDetailContainer></ItemDetailContainer>}></Route>
          <Route exact path="/ItemUpload" element={<ItemUpload></ItemUpload>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App;
