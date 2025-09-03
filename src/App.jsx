import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'

import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './Login/login'
import Register from './Register/register'
import Dashboard from './Dashboard/dashboard'
import Layout from './components/layout'
import Home from './Home/home'
import KYCVerificationPage from './Admin/pages/KYCVerficationPage'
import AdminHomePage from './Admin/pages/HomePage'
import AdminRoutes from './Admin/AdminRoutes'

function App() {


  return (
    <BrowserRouter>
    <Routes>

    <Route path="/" element={<Home />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    {/* <Route path = "/admin/kycverification" element = {<KYCVerificationPage/>}></Route>
    <Route path = "/admin/home" element = {<AdminHomePage/>}></Route> */}
    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/dashboard" 
    element={
      <Layout>
        <Dashboard />
      </Layout>
      }>

    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
