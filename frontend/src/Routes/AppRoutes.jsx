import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/user/register" element={<div>/user/register</div>} />
          <Route path="/user/login" element={<div>/user/login</div>} />
          <Route path="/food-partner/register" element={<div>/food-partner/register</div>} />
          <Route path="/food-partner/login" element={<div>/food-partner/login</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default AppRoutes
