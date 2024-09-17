import React from 'react';

const GoogleUserLogo = ({ name, bgColor }) => {
  const styles = {
    backgroundColor: bgColor,
  };

  return (
    <div className="flex items-center justify-center w-[20px] h-[20px]  rounded-full" style={styles}>
      <p className="text-white text-[0.5rem] font-normal">{name.charAt(0)}</p>
    </div>
  );
};

export default GoogleUserLogo;