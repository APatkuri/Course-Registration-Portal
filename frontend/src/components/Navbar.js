import React from 'react'
import "./css/navbar.css"
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navigation'>
        <Link to='/home'>Home</Link>
        <Link to='/instructor'>Instructor</Link>
        <Link to='/home/registration'>Registration</Link>
        <Link to='/course/running'>Courses</Link>
        <Link to='/login'>Login</Link>
    </nav>
  )
}
