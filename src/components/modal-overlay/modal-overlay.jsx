/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }) {
  return (
    <div
      className={styles.overlay}
      onClick={() => {
        onClose(false);
      }}
    />
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
