import React from 'react';

export const getFirstImage = (image, onClick) => {
  return (image[0] && typeof image[0] === 'object')
    ? (
      <img
        className="item-image"
        onClick={onClick}
        src={image[0].url}
        alt=""
      />
    )
    : null;
};
