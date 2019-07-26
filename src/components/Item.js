import React, { useState } from 'react';
import ItemModal from './ItemModal';

import './stylesheets/Item.css';

export default function Item(props) {
  const state = {
    modalOpen: false,
  };

  const [modalOpen, setModalOpen] = useState(state.modalOpen);

  const onClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return (
    <div className="item">
      <p className="item-title">{props.name}</p>
      <p className="item-price">{`${props.price} ${props.currency}`}</p>
      {/* <div id="add-to-cart"> */}
      {/* <button><span>View</span></button> */}
      {/* </div> */}
      {
        modalOpen
          ? (
            <ItemModal
              {...props}
              modalOpen={modalOpen}
              onCloseModal={closeModal}
              onButtonClick={props.addToCartClick}
            />
          )
          : null
      }
      <img className="item-image" onClick={onClick} src={props.image} alt="" />
    </div>
  );
}
