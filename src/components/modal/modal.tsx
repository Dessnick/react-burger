import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const Modal = (props) => {
  const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      props.onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscClose, false);
    return () => {
      document.removeEventListener('keydown', handleEscClose, false);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={styles.modal}>
        {props.title && (
          <h2
            className={`${styles.title} + text text_type_main-large mt-15 mb-5 ml-10 mr-10`}
          >
            {props.title}
          </h2>
        )}
        <button
          className={styles.button_close}
          type="button"
          onClick={() => props.onClose(false)}
        >
          <CloseIcon type="primary" />
        </button>
        {props.children}
      </div>
    </>,
    document.getElementById('modals')!
  );
};

export default Modal;
