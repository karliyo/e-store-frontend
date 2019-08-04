import React from 'react';
import EscapeOutside from 'react-escape-outside';

import { getFirstImage } from '@components/goodies/helpers/ImageHelper';
import NinjaButton from '@components/goodies/ninjaButton';
import './ItemModal.scss';

export default function ItemModal(props) {
  return props.modalOpen ? (
    <>
      <div
        className="modal"
        id="item-modal"
      >
        <EscapeOutside onEscapeOutside={props.onCloseModal}>
          <div className="modal-content-wrapper">
            <div className="partition modal-header">
              <NinjaButton
                text="X"
                label="Close"
                className="close-button"
                wrapperclass="close-button-wrapper"
                onClick={props.onCloseModal}
              />
            </div>
            <div className="partition modal-content">
              <div className="column">
                <p className="item-title">{props.name}</p>
                <p className="item-price">{`${props.price} ${props.currency}`}</p>
                {getFirstImage(props.image)}
              </div>
              <div className="column">
                <p className="subtitle">Description</p>
                <p className="item-description">{props.description}</p>
                <p className="subtitle">Location</p>
                <p className="item-store-location">{props.store?.name}</p>

                <NinjaButton
                  text="Add to cart"
                  label="Add to cart"
                  className={props.inStock ? 'stock-item' : 'oos-item'}
                  disabled={!props.inStock}
                  onClick={() => props.onAddToCartClick(props)}
                />
              </div>
            </div>
          </div>
        </EscapeOutside>
      </div>
    </>
  ) : null;
}
