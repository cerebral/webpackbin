import React from 'react';
import styles from './styles.css';
import classNames from 'classnames';
import icons from 'common/icons.css';

function IconButton(props) {
  function renderContent() {
    if (props.children) {
      return (
        <div className={styles.iconTitleWrapper}>
          <div
            className={classNames({
              [styles.activeIcon]: props.active,
              [styles.notifyIcon]: props.notify,
              [styles.disabledIcon]: props.disabled,
              [styles.icon]: !props.active && !props.notify && !props.disabled,
            })}
          >
            {props.imageUrl ? (
              <div className={icons[props.icon]}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${props.imageUrl})` }}
                />
              </div>
            ) : (
              <div className={icons[props.icon]} />
            )}
          </div>
          <div className={styles.iconTitle}>{props.children}</div>
          {props.tooltip ? <i>{props.tooltip}</i> : null}
        </div>
      );
    }

    return (
      <div
        className={classNames({
          [styles.activeIcon]: props.active,
          [styles.notifyIcon]: props.notify,
          [styles.disabledIcon]: props.disabled,
          [styles.icon]: !props.active && !props.notify && !props.disabled,
        })}
      >
        {props.imageUrl ? (
          <div className={icons[props.icon]}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${props.imageUrl})` }}
            />
          </div>
        ) : (
          <div className={icons[props.icon]} />
        )}
        {props.tooltip ? <i>{props.tooltip}</i> : null}
      </div>
    );
  }

  if (props.href) {
    return (
      <a
        href={props.href}
        className={classNames(styles.button, props.className, {
          [styles.disabledButton]: props.disabled,
        })}
        onClick={event => props.disabled && event.preventDefault()}
        download
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      className={classNames(styles.button, props.className)}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {renderContent()}
    </button>
  );
}

export default IconButton;
