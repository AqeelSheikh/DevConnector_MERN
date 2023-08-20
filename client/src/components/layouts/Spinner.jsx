import React from "react";
import spin from "../../img/spin.gif";


const Spinner = () => {
  return (
    <>
      <img
        src={spin}
        style={{ width: '50px', height: '50px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
      
    </>
  );
};

export default Spinner;
