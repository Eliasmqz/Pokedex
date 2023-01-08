import { Route, Routes } from "react-router-dom"
import { ProtectedHome } from "./components/ProtectedHome"
import ProtectedLogin from "./components/ProtectedLogin"
import Home from "./pages/Home"
import Pokedex from "./pages/Pokedex"
import Pokemon from"./pages/Pokemon"

function App() {


  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedHome />}>
          <Route path="/" element={<Home />}/>
        </Route>
        <Route element={<ProtectedLogin />}>
          <Route path="/pokedex" element={<Pokedex />}/>
          <Route path="/pokedex/:id" element={<Pokemon />}/>
        </Route>
      </Routes> 
      
    </div>
  )
}

export default App
