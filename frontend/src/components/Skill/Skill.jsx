import React from 'react'
import './Skill.css'

const Skill = ({ img, title}) => {
  return (
    <div className='skill'>
        <img src={img} className='skill-img'/>
        <p>{title}</p>
    </div>
  )
}

export default Skill;