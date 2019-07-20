import React from 'react';

const Nav = (props) => {
  return (
    <nav className={`nav ${props.isActive ? '' : 'disabled'}`}>
      <a href="#" className="nav-link active">Words</a>
      <a href="#" className="nav-link">Bookmarks</a>
      <a href="#" className="nav-link">Random words</a>
    </nav>
  )
}

export default Nav;