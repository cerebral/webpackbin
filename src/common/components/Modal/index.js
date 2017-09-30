import React from 'react';
import classnames from 'classnames';
import styles from './styles.css';

function Modal(props) {
  const style = {};

  if (props.width) {
    style.width = props.width;
    style.minWidth = props.width;
  }

  return (
    <div
      className={classnames(styles.backdrop, props.className)}
      onClick={props.onHide}
    >
      <div className={styles.modalWrapper}>
        <div
          className={styles.modal}
          onClick={event => {
            event.stopPropagation();
          }}
          style={style}
        >
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
