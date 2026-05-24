import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/user/UserRegister'
import UserLogin from '../pages/user/UserLogin'
import FoodPartnerRegister from '../pages/foodPartner/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/foodPartner/FoodPartnerLogin'
import Home from '../general/Home'
import Createfoodpartner from '../Createfood-partner/Createfoodpartner'

const AppRoutes = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
          <Route path="/" element={<Home/>} />
          <Route path="/food-partner" element={<Createfoodpartner/>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoutes
