import React from 'react';
import {connect} from 'cerebral/react';
import {state, signal} from 'cerebral/tags';
import {DuckyLoader, BackgroundLoader} from 'dc';
import styles from './styles.css';
import classNames from 'classnames';
import Snackbar from 'common/components/Snackbar';

import InternetExplorerModal from '../App/InternetExplorerModal';
import CreateProfileModal from '../App/CreateProfileModal';
import NotFound from '../App/NotFound';
import RequiresProfileModal from './Modals/RequiresProfileModal';
import TranslateModal from './Modals/TranslateModal';

import DuckyHeader from './Header';
import OnboardingModal from './Modals/OnboardingModal';
import ErrorModal from './Modals/ErrorModal';
import ProviderErrorModal from './Modals/ProviderErrorModal';
import RegisterModal from './Modals/RegisterModal';
import CO2ActivitiesInfoModal from './Modals/CO2ActivitiesInfoModal';
import LoginModal from './Modals/LoginModal';
import ForgotPasswordModal from './Modals/ForgotPasswordModal';
import ForgotPasswordConfirmationModal from './Modals/ForgotPasswordConfirmationModal';
import TermsAndConditionsModal from './Modals/TermsAndConditionsModal';
import FeedbackModal from './Modals/FeedbackModal';
import NewVersionModal from './Modals/NewVersionModal';

import userProfile from 'computed/userProfile';
import {t} from 'text';

export default connect({
  userProfile,
  currentPage: state`app.currentPage`,
  user: state`app.user`,
  isAuthenticating: state`app.isAuthenticating`,
  isSmall: state`useragent.media.small`,
  isMedium: state`useragent.media.medium`,
  showInternetExplorerModal: state`app.showInternetExplorerModal`,
  showMainMenu: state`header.showMainMenu`,
  showRequiresProfileModal: state`authentication.showRequiresProfileModal`,
  showOnboardingModal: state`app.showOnboardingModal`,
  isLoadingPage: state`app.isLoadingPage`,
  currentTeamModalChallengeKey: state`challenges.currentTeamModalChallengeKey`,
  showErrorModal: state`app.showErrorModal`,
  errorMessage: state`error`,
  appClicked: signal`app.appClicked`,
  internetExplorerAdvanced: signal`app.internetExplorerAdvanced`,
  internetExplorerCancelled: signal`app.internetExplorerCancelled`,
  registerModalCancelled: signal`app.registerModalCancelled`,
  onboardingModalClicked: signal`app.onboardingModalClicked`,
  reportErrorClicked: signal`app.reportErrorClicked`,
  joinTeamChallengeClicked: signal`challenge.teamChallenge.joinChallengeClicked`
},
  class Desktop extends React.Component {

    /* eslint-disable react/no-set-state, react/no-did-update-set-state, no-undef */

    constructor(props) {
      super(props);
      this.state = {
        page: null,
        isLoadingFiles: true
      };
      this.handleOnClick = this.handleOnClick.bind(this);
      this.setModuleComponent = this.setModuleComponent.bind(this);
    }
    componentDidMount() {
      this.loadCurrentPage();
    }
    componentDidUpdate(prevProps, prevState) {
      if (
        prevProps.currentPage !== this.props.currentPage
      ) {
        this.loadCurrentPage();
      }
    }
    refreshPage(error) {
      if (error.message.indexOf('Loading chunk') === 0) {
        alert(t('common.reload_page'));
        location.reload();
      } else {
        throw error;
      }
    }
    setModuleComponent(module) {
      const Component = module.default;

      this.setState({page: Component});
    }
    loadCurrentPage() {
      this.setState({isLoadingFiles: true});
      let loadPage = null;

      switch (this.props.currentPage) {
      case 'challenges':
        loadPage = import('./Challenges').then(this.setModuleComponent).catch(this.refreshPage);
        break;
      case 'profile':
        loadPage = import('./Profile').then(this.setModuleComponent).catch(this.refreshPage);
        break;
      case 'challenge':
        loadPage = import('./Challenge').then(this.setModuleComponent).catch(this.refreshPage);
        break;
      case 'welcome':
        loadPage = import('./Welcome').then(this.setModuleComponent).catch(this.refreshPage);
        break;
      case 'notFound':
        loadPage = new Promise((resolve) => {
          this.setState({page: NotFound}, resolve);
        });
        break;
      default:
        loadPage = Promise.resolve();
      }

      loadPage
        .then(() => {
          this.setState({isLoadingFiles: false});
        });
    }
    handleOnClick() {
      this.props.appClicked();
    }
    createLayout() {
      const Page = this.state.page;
      const layout = {
        Header: null,
        Page: null,
        Loader: null
      };

      if (this.props.user && this.props.currentPage !== 'welcome') {
        layout.Header = DuckyHeader;
      }

      if (this.props.isAuthenticating) {
        layout.Loader = BackgroundLoader;
      }

      if (this.props.isLoadingPage) {
        layout.Loader = DuckyLoader;
      }

      if (!this.state.isLoadingFiles && !this.props.isLoadingPage) {
        layout.Page = Page;
      }

      return layout;
    }
    render() {
      if (this.state.isLoadingInitialFiles) {
        return <DuckyLoader image />;
      }

      const {Header, Page, Loader} = this.createLayout();

      return (
        <div
          className={classNames({
            [styles.wrapper]: Boolean(this.props.user &&
            this.props.currentPage !== 'welcome'),
            [styles.mainMenu]: !this.props.isMedium && this.props.showMainMenu
          })}
          onClick={this.handleOnClick}
        >
          {Header ? <Header /> : null}
          {Page ? <Page /> : null}
          {Loader ? <Loader image /> : null}
          <RequiresProfileModal />
          <CreateProfileModal />
          <ErrorModal
            errorMessage={this.props.errorMessage}
            show={this.props.showErrorModal}
            onHide={() => location.reload()}
            onReport={() => this.props.reportErrorClicked()}
          />
          <ProviderErrorModal />
          <LoginModal />
          <TranslateModal />
          <RegisterModal />
          <TermsAndConditionsModal />
          <ForgotPasswordModal />
          <ForgotPasswordConfirmationModal />
          <CO2ActivitiesInfoModal />
          <FeedbackModal />
          <NewVersionModal />
          <Snackbar />
          <OnboardingModal
            show={this.props.showOnboardingModal}
            onClose={() => this.props.onboardingModalClicked()}
            />
          <InternetExplorerModal
            onAdvance={() => this.props.internetExplorerAdvanced()}
            onCancel={() => this.props.internetExplorerCancelled()}
            show={this.props.showInternetExplorerModal}
            />
        </div>
      );
    }
  }
);
