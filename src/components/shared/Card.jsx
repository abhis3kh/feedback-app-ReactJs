import React from 'react';
const Card = ({ children, reverse }) => {
  //this children will give you elements inside of the CArd card where it wrapped in.
  return <div className={`card ${reverse ? 'reverse' : ''}`}>{children}</div>;
};

// setting the default prop if nothing comes from parent node. so it doesn't break.
Card.defaultProps = {
  reverse: true, //this will make it drak, to make light make it false or else 5th line
};
export default Card;
