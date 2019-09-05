import React from 'react';

const Preloader = (props) => {
  return <img src={`/img/${props.size}-loader.svg`} alt="" />
}

export default Preloader;