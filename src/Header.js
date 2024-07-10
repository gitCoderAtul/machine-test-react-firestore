import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <Link to='categorymaster' className='nav-link'> Category Master</Link>
      </li>
      <li className="nav-item">
      <Link to='productmaster' className='nav-link'> Product Master</Link> 
      </li> 
      <li className="nav-item">
      <Link to='productlist' className='nav-link'> Product List</Link> 
      </li> 
      </ul>
  </div>
  </div>
</nav>
  )
}
