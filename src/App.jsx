// import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import LandingPage from "./components/LandingPage";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import ItemUpload from "./components/ItemUpload";
import ImageUpload from "./components/ImageUpload";
import CartContainer from "./components/CartContainer";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

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
          <Route exact path="/ImageUpload" element={<ImageUpload></ImageUpload>}></Route>
          <Route exact path="/Cart" element={<CartContainer></CartContainer>}></Route>
          <Route exact path="/LogIn" element={<LogIn></LogIn>}></Route>
          <Route exact path="/SignUp" element={<SignUp></SignUp>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App;
