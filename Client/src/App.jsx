import React from 'react'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Regsiter from './pages/Register'
import Home from './pages/Home'
function App() {
  return (
    <>
      <BrowserRouter className='font-mono'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>  
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Regsiter/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
