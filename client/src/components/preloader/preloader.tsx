import React from 'react';

type Props = {
  size: string;
};

const Preloader: React.FC<Props> = ({ size }) => {
  return <img className="preloader" src={`/img/${size}-loader.svg`} alt="" />;
};

export default Preloader;
