import { useState } from 'react'
import {Route, Routes} from "react-router-dom"
import Landing from './pages/Landing'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<div>Landing</div>} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/signin" element={<div>SignIn</div>} />
      <Route path="/signup" element={<div>SignUp</div>} />
      <Route path="/forgot-password" element={<div>ForgotPassword</div>} />
    </Routes>
    )
}

export default App
