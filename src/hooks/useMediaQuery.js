import React, { useLayoutEffect, useState } from 'react';
const useMediaQuery = () => {
  const [screenSize, setScreenSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updatingSizes = () => {
      setScreenSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', updatingSizes);
    updatingSizes();
    return () => window.removeEventListener('resize', updatingSizes);
  }, []);
  return screenSize;
};

export default useMediaQuery;
