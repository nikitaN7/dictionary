import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaLanguage, FaHome, FaDumbbell, FaBook } from 'react-icons/fa';

type Props = {
  isActive: boolean;
};

const Nav: React.FC<Props> = ({ isActive }) => {
  return (
    <nav className={`nav ${isActive ? '' : 'disabled'}`}>
      <FaLanguage className="nav--logo" />

      <div className="nav--top">
        <div className="nav--menu">
          <NavLink to="/" exact activeClassName="active">
            <FaHome />
            <span>Home</span>
          </NavLink>
          <NavLink to="/dictionary" exact activeClassName="active">
            <FaBook />
            <span>Dictionary</span>
          </NavLink>
          <NavLink to="/trainer" exact activeClassName="active">
            <FaDumbbell />
            <span>Repetition</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
