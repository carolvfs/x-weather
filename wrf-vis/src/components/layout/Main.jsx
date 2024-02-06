import './Main.css'
import React from 'react'

export default props =>
        <main className='content container-fluid'>
            {/* <div className="p-3 mt-3"> */}
            <div>
                {props.children}
            </div>
        </main>