import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'

export default props =>
    <aside className="menu-area">
        <Navbar className="menu">
            <ul className="navbar-nav mr-auto">
                {/* <Link to="/">
                    <i className="fa fa-home"></i> Start
                </Link> */}
                <Link to="/stat">
                    <i className="fa fa-area-chart"></i> Statistics
                </Link>
                <Link to="/prob">
                    <i className="fa fa-percent"></i> Probability
                </Link>
            </ul>
        </Navbar>    
    </aside>