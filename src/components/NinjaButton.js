import React from 'react';

export default function NinjaButton(props) {
  return (
    <div className="button-wrapper">
      <button type="button" label={props.text} {...props} className={`ninja-button ${props.className}`}>
        <p>{props.text}</p>
      </button>
    </div>
  );
}
