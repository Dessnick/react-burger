import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import styles from './modal.module.css';

const Modal = (props) => {
  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        props.onClose();
      }
    };

    window.addEventListener('keydown', handleEscClose, false);
    return () => {
      window.removeEventListener('keydown', handleEscClose, false);
    };
  }, [props, props.onClose]);

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
    document.getElementById('modals')
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Modal;
