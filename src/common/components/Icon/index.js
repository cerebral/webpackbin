import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';
import icons from 'common/icons.css';

function Icon(props) {
  return (
    <button
      className={classNames(styles.button, props.className, {
        [styles.pointerCursor]: props.onClick,
      })}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className={icons[props.icon]} />
    </button>
  );
}

export default Icon;
