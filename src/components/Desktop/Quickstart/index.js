import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import styles from './styles.css';
import Description from 'common/components/Description';

export default connect(
  {
    showQuickstart: state`configure.showQuickstart`,
    quickstarts: state`configure.quickstarts`,
    quickstartClicked: signal`configure.quickstartClicked`,
    hideQuickstartClicked: signal`configure.hideQuickstartClicked`,
  },
  function Quickstart({
    showQuickstart,
    quickstarts,
    quickstartClicked,
    hideQuickstartClicked,
  }) {
    if (!showQuickstart) {
      return null;
    }

    return (
      <div className={styles.backdrop}>
        <div className={styles.modal}>
          <div className={styles.header}>Get started</div>
          <p>
            You can choose to start your bin with an entry point. With the entry
            point you get access to adding NPM packages bundled with Webpack.
            You can at any time change <b>loaders</b> and <b>NPM packages</b> in
            the BIN settings.
          </p>
          <ul className={styles.list}>
            {quickstarts.map(function(quickstart) {
              return (
                <li
                  className={styles.listItem}
                  onClick={() =>
                    quickstartClicked({ template: quickstart.template })}
                >
                  {quickstart.title}
                  <Description>{quickstart.description}</Description>
                </li>
              );
            })}
          </ul>
          <div
            className={styles.continue}
            onClick={() => hideQuickstartClicked()}
          >
            continue with empty bin
          </div>
        </div>
      </div>
    );
  }
);
