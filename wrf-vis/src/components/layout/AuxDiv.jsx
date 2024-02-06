import './AuxDiv.css'
import React from 'react'

export default props =>
    <div className='aux' id={`${props.type}`}>
        {props.children}
    </div>