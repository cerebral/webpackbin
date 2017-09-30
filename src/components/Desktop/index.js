import React from 'react';
import { connect } from '@cerebral/react';
import { state, signal } from 'cerebral/tags';
import classnames from 'classnames';
import CodeEditor from './CodeEditor';
import Loader from 'common/components/Loader';
import MainNavigation from './MainNavigation';
import FilesBar from './FilesBar';
import Sandbox from './Sandbox';
import Folder from './Folder';
import LiveParticipants from './LiveParticipants';
import Snackbar from './Snackbar';
import Quickstart from './Quickstart';
import styles from './styles.css';

export default connect(
  {
    clicked: signal`app.clicked`,
    user: state`app.user`,
    isLoading: state`app.isLoading`,
    isLive: state`app.currentBin.isLive`,
  },
  function Desktop({ clicked, user, showIsPackaging, isLoading, isLive }) {
    return (
      <div className={styles.wrapper} onClick={() => clicked()}>
        <MainNavigation />
        <FilesBar />
        {user ? (
          <div className={styles.editorWrapper}>
            <CodeEditor />
            <Sandbox />
            <Folder />
          </div>
        ) : null}
        {isLoading ? <Loader>Loading up the bin!</Loader> : null}
        {isLive ? <LiveParticipants /> : null}
        <Snackbar />
        <Quickstart />
      </div>
    );
  }
);
