import React, { useState } from 'react';
import Skeleton from 'react-skeleton-loader';

import ItemModal from './modal/ItemModal';

import './Item.css';

const skeletonColor = 'rgb(133, 228, 189)';
const imageSkeleton = {
  width: '196px',
  height: '300px',
  heightRandomness: 0.4,
  widthRandomness: 0.4,
  borderRadius: 0,
};
export default function Item(props = {}) {
  const {
    price, currency, name, isFetching,
  } = props;
  const state = {
    modalOpen: false,
  };

  const [modalOpen, setModalOpen] = useState(state.modalOpen);

  const onClick = (e) => {
    e?.preventDefault();
    setModalOpen(true);
  };

  const closeModal = (e) => {
    e?.preventDefault();
    setModalOpen(false);
  };

  const getFirstImage = () => ((props.image[0] && typeof props.image[0] === 'object')
    ? (<img className="item-image" onClick={onClick} src={props.image[0].url} alt="" />)
    : null);

  const nameFormatted = isFetching ? <Skeleton color={skeletonColor} /> : name;
  const priceFormatted = isFetching ? <Skeleton color={skeletonColor} /> : `${price} ${currency}`;
  const mainImageContainer = isFetching
    ? <Skeleton color={skeletonColor} {...imageSkeleton} />
    : getFirstImage();
  return (
    <div className="item">
      <p className="item-title">{nameFormatted}</p>
      <p className="item-price">{priceFormatted}</p>
      {
        modalOpen
          ? (
            <ItemModal
              {...props}
              modalOpen={modalOpen}
              onCloseModal={closeModal}
              onAddToCartClick={props.addToCartClick}
              onRequestClose={closeModal}
            />
          )
          : null
      }
      {mainImageContainer}
    </div>
  );
}
