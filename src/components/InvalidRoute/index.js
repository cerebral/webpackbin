import React from 'react';
import styles from './styles.css';
import Button from 'common/components/Button';

function InvalidRoute(props) {
  return (
    <div className={styles.wrapper}>
      <div>
        <strong>The reason you see this page</strong> is that the route is
        invalid. You have probably clicked an old Webpackbin link. Please notify
        the author about moving their BIN to the new version of Webpackbin. In
        the meantime you can continue to the old version.
      </div>
      <br />
      <Button
        onClick={() => {
          window.location.href =
            'https://webpackbin.herokuapp.com/' + props.route;
        }}
      >
        Continue to BIN
      </Button>
    </div>
  );
}

export default InvalidRoute;
