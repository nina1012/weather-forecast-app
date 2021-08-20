import React from 'react';
import { BiSun } from 'react-icons/bi';
const Spinner = () => {
  return (
    <div className="centering mt-40">
      <BiSun
        size={100}
        style={{
          animation: 'rotatingSun ease-in-out infinite 1s',
          color: '#feec65',
        }}
      />
    </div>
  );
};

export default Spinner;
