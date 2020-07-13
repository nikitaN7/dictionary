import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { logout } from '../../actions/userActions';

type Props = {
  navShow: boolean;
  navToggle(): void;
};

const Header: React.FC<Props> = ({ navShow, navToggle }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogoutClick = () => {
    dispatch(logout(() => history.push('/signin')));
  };

  return (
    <div className="header">
      <button
        className={`header__burger ${navShow ? 'is-open' : ''}`}
        type="button"
        onClick={navToggle}
      >
        <span />
        <span />
        <span />
      </button>

      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Header;
