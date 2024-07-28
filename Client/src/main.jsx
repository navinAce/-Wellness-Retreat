import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Navbar from './pages/header/navbar'
import SinglePage from './pages/main/singlePage.jsx'
import Footer from './pages/footer/footer.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Order from './pages/order/Order.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element:<><Navbar /><SinglePage /><Footer /></>
  },
  {
    path: '/product/:id',
    element:<><Navbar /><Order/><Footer /></>
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
