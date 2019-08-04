import React from 'react';

export default props => (
  <div className={`button-wrapper ${props.wrapperclass || ''}`}>
    <button
      type="button"
      onClick={props.onClick}
      label={props.text}
      {...props}
      className={`ninja-button ${props.className}`}
    >
      <p>{props.text}</p>
    </button>
  </div>
);
