import React from 'react';
import { FaStar } from 'react-icons/fa';

const Star = ({ selected, onSelect }) => {
  return (
    <FaStar
      color={selected ? 'gold' : 'gray'}
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Star;