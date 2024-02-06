import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'

import { BrowserRouter } from 'react-router-dom'
import Routes from './routes/Routes'
// import Footer from './components/layout/Footer'
import Nav from './components/layout/Nav'

export default props =>
    <BrowserRouter>
        <div className='app'>
            <Nav/>
            <Routes />
            {/* <Footer/> */}
        </div>
    </BrowserRouter>