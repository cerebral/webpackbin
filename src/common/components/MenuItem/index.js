import React from 'react';
import styles from './styles.css';
import icons from 'common/icons.css';
import classnames from 'classnames';

function MenuItem(props) {
  return (
    <div
      className={classnames(styles.wrapper, {
        [styles.disabled]: props.disabled,
        [styles.active]: props.active,
      })}
      onClick={props.disabled ? null : props.onClick}
    >
      {props.icon ? (
        <div className={classnames(icons[props.icon], styles.icon)} />
      ) : null}
      {props.children}
    </div>
  );
}

export default MenuItem;
