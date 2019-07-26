import React from 'react';

import NinjaButton from '../../../goodies/ninjaButton';
import './ItemModal.css';

const oosButton = {
  color: '#000',
  paddingBottom: '10px',
};

const instockButton = {
  color: '#FFF',
  paddingBottom: '0',
};

const dialogStyle = {
  width: '90%',
};

const closeButtonStyle = {
  marginLeft: '2rem',
};


export default function ItemModal(props) {
  return props.modalOpen ? (
    <>
      <div
        className="modal"
        id="item-modal"
      >
        <div className="modal-content-wrapper">
          <div className="modal-left-column">
            <p className="item-title">{props.name}</p>
            <p className="item-price">{`${props.price} ${props.currency}`}</p>
            <img className="item-image" src={props.image} alt="" />
          </div>
          <div className="modal-right-column">
            <p className="subtitle">Description</p>
            <p className="item-description">{props.description}</p>
            <p className="subtitle">Location</p>
            <p className="item-store-location">{props.store}</p>

            <NinjaButton
              text="Add to cart"
              label="Add to cart"
              className={props.instock ? 'stock-item' : 'oos-item'}
              // backgroundColor={props.instock ? '#03DAC6' : '#FF0000'}
              disabled={!props.instock}
              onClick={props.onButtonClick}
            />
            <NinjaButton
              text="X"
              label="Close"
              className="close-button"
              onClick={props.onCloseModal}
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
}
