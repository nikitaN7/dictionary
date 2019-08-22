import React, { Component } from 'react';

const ScrollGroup = (props) => {
  return (
    <div className="dictionary__scroll">
      <input type="text" placeholder="Enter col number"/>
      <button className="dictionary__scroll__btn">Scroll</button>
    </div>
  )
}

export default ScrollGroup;