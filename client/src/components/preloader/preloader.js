import React from 'react';

const Preloader = (props) => {
  return <img className="preloader" src={`/img/${props.size}-loader.svg`} alt="" />
}

export default Preloader;