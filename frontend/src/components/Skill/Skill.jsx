import React from 'react'
import './Skill.css'

const Skill = ({ img, title}) => {
  const imagePath = `/img/${img}`;

  return (
    <div className='skill'>
        <img src={imagePath} className='skill-img'/>
        <p>{title}</p>
    </div>
  )
}

export default Skill