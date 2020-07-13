import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  isActive: boolean;
  allWordsDelete(): void;
};

const Nav: React.FC<Props> = ({ isActive, allWordsDelete }) => {
  return (
    <nav className={`nav ${isActive ? '' : 'disabled'}`}>
      <div className="nav__title">
        <img
          className="nav__title__icon"
          src="/img/dictonary-icon.png"
          alt=""
        />
        <h1>Words dictionary</h1>
      </div>

      <div className="nav--top">
        <div className="nav--menu">
          <NavLink to="/dictionary" exact activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/trainer" activeClassName="active">
            Words Trainer
          </NavLink>
          <NavLink to="/import" activeClassName="active">
            Words Import
          </NavLink>
        </div>
      </div>

      <div className="nav--bottom">
        <a
          href="#"
          className="nav__link nav__link--bucket"
          onClick={e => {
            e.preventDefault();
            allWordsDelete();
          }}
        >
          <svg
            height="512pt"
            viewBox="-64 0 512 512"
            width="512pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m256 80h-32v-48h-64v48h-32v-80h128zm0 0" fill="#62808c" />
            <path
              d="m304 512h-224c-26.507812 0-48-21.492188-48-48v-336h320v336c0 26.507812-21.492188 48-48 48zm0 0"
              fill="#e76e54"
            />
            <path
              d="m384 160h-384v-64c0-17.671875 14.328125-32 32-32h320c17.671875 0 32 14.328125 32 32zm0 0"
              fill="#77959e"
            />
            <path
              d="m260 260c-6.246094-6.246094-16.375-6.246094-22.625 0l-41.375 41.375-41.375-41.375c-6.25-6.246094-16.378906-6.246094-22.625 0s-6.246094 16.375 0 22.625l41.375 41.375-41.375 41.375c-6.246094 6.25-6.246094 16.378906 0 22.625s16.375 6.246094 22.625 0l41.375-41.375 41.375 41.375c6.25 6.246094 16.378906 6.246094 22.625 0s6.246094-16.375 0-22.625l-41.375-41.375 41.375-41.375c6.246094-6.25 6.246094-16.378906 0-22.625zm0 0"
              fill="#fff"
            />
          </svg>
          Remove all words
        </a>
      </div>
    </nav>
  );
};

export default Nav;