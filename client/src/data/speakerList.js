import React from 'react';
import BritishManIcon from '../assets/icons/BritishManIcon';
import BritishWomanIcon from '../assets/icons/BritishWomanIcon';
import AmericanManIcon from '../assets/icons/AmericanManIcon';
import AmericanWomanIcon from '../assets/icons/AmericanWomanIcon';

export const speakerList = [
  {
    desc: 'UK English Male',
    icon: <BritishManIcon />,
    name: 'Peter',
    country: 'UK'
  },
  {
    desc: 'UK English Female',
    icon: <BritishWomanIcon />,
    name: 'Susan',
    country: 'UK'
  },
  {
    desc: 'US English Male',
    icon: <AmericanManIcon />,
    name: 'Bob',
    country: 'US'
  },
  {
    desc: 'US English Female',
    icon: <AmericanWomanIcon />,
    name: 'Monica',
    country: 'US'
  }
];
