import React from 'react'
import './Education.css'

const Education = ({ year, title, section,}) => {
    return (
        <div>
            <li>
                <span className="date">{year}</span>
                <div className="content">
                    <h3>{section}</h3>
                    <p>{title}</p>
                </div>
            </li>
        </div>
    )
}

export default Education