import React from 'react';

require('./stylesheets/ItemModal.css');

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
        id="item-modal"
        open={props.modalOpen}
        autoDetectWindowHeight
        autoScrollBodyContent
        contentStyle={dialogStyle}
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

            <button
              label="Add to cart"
              backgroundColor={props.instock ? '#03DAC6' : '#FF0000'}
              style={props.instock ? instockButton : oosButton}
              labelStyle={instockButton}
              disabled={!props.instock}
              onClick={props.onButtonClick}
            />
            <button
              label="Close"
              primary
              style={closeButtonStyle}
              onClick={props.onCloseModal}
            />
          </div>
        </div>
      </div>
    </>
  ) : null;
}
