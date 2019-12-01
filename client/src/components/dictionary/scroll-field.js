import React, { useState } from 'react';
import { Link } from 'react-scroll';

const ScrollField = () => {
  const [scrollTo, setScrollTo] = useState('');

  const handleChange = value => {
    const re = /^[0-9\b]+$/;

    if (value === '' || re.test(value)) {
      setScrollTo(value);
    }
  };

  return (
    <div className="dictionary__scroll">
      <input
        type="text"
        placeholder="Enter col number"
        value={scrollTo}
        onChange={e => handleChange(e.target.value)}
      />

      <Link
        activeClass="active"
        className="dictionary__scroll__anchor"
        containerId="dictionaryTable"
        spy={true}
        offset={-225}
        smooth={true}
        to={`${scrollTo}-col`}
        duration={400}
      >
        Scroll
      </Link>
    </div>
  );
};

export default ScrollField;
