import React from 'react';
import './Button.scss';

export default function CartButton(props) {
  const { icon: Icon } = props;
  return (
    <div className={`icon ${props.className}`}>
      <Icon {...{ ...props, icon: null }} />
    </div>
  );
}
