import { useState } from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
