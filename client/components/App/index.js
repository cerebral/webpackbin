import React from 'react';
import {connect} from 'cerebral/react';
import {state} from 'cerebral/tags';
import {Loader} from 'dc';

export default connect({
  isSmall: state`useragent.media.small`,
  isSignedOut: state`authentication.isSignedOut`
},
  class App extends React.Component {

    /* eslint-disable react/no-set-state, react/no-did-update-set-state, no-undef */

    constructor(props) {
      super(props);
      this.state = {
        device: null,
        isLoadingInitialFiles: true
      };
      this.setModuleComponent = this.setModuleComponent.bind(this);
      this.refreshPage = this.refreshPage.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
      if (
        (prevState.isLoadingInitialFiles && !this.state.isLoadingInitialFiles)
      ) {
        document.querySelector('#loaderWrapper').className = 'hidden';
      }
      if (prevProps.isSmall !== this.props.isSmall) {
        this.loadDevice();
      }
    }
    componentDidMount() {
      this.loadDevice();
    }
    refreshPage(error) {
      if (error.message.indexOf('Loading chunk') === 0) {
        alert(t('common.reload_page'));
        location.reload();
      } else {
        throw error;
      }
    }
    loadDevice() {
      let loadDevice = null;

      if (this.props.isSmall) {
        loadDevice = import('../Mobile').then(this.setModuleComponent).catch(this.refreshPage);
      } else {
        loadDevice = import('../Desktop').then(this.setModuleComponent).catch(this.refreshPage);
      }

      loadDevice
        .then(() => {
          this.setState({
            isLoadingInitialFiles: false
          });
        });
    }
    setModuleComponent(module) {
      const Component = module.default;

      this.setState({device: Component});
    }
    handleOnClick() {
      this.props.appClicked();
    }
    render() {
      if (this.state.isLoadingInitialFiles || this.props.isSignedOut) {
        return <Loader image />
      }

      const Device = this.state.device;

      return <Device />;
    }

    /* eslint-enable react/no-set-state, react/no-did-update-set-state, no-undef */

  }
);
