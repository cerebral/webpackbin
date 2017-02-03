import React from 'react';
import {connect} from 'cerebral/react';
import {state, signal} from 'cerebral/tags';
import styles from './styles.css';
import classNames from 'classnames';
import {BackgroundLoader, DuckyLoader} from 'dc';
import Snackbar from 'common/components/Snackbar';

import CreateProfileModal from '../App/CreateProfileModal';
import NotFound from '../App/NotFound';
import RequiresProfileModal from './Modals/RequiresProfileModal';
import TranslateModal from './Modals/TranslateModal';

import DuckyHeader from './Header';
import OnboardingModal from './Modals/OnboardingModal';
import CO2ActivitiesInfoModal from './Modals/CO2ActivitiesInfoModal';
import ErrorModal from './Modals/ErrorModal';
import RegisterModal from './Modals/RegisterModal';
import LoginModal from './Modals/LoginModal';
import ForgotPasswordModal from './Modals/ForgotPasswordModal';
import ForgotPasswordConfirmationModal from './Modals/ForgotPasswordConfirmationModal';
import TermsAndConditionsModal from './Modals/TermsAndConditionsModal';
import FeedbackModal from './Modals/FeedbackModal';
import ProviderErrorModal from './Modals/ProviderErrorModal';
import NewVersionModal from './Modals/NewVersionModal';

import userProfile from 'computed/userProfile';
import {t} from 'text';
import utils from 'utils/common';

export default connect({
  userProfile,
  currentPage: state`app.currentPage`,
  user: state`app.user`,
  isAuthenticating: state`app.isAuthenticating`,
  isSmall: state`useragent.media.small`,
  showMainMenu: state`header.showMainMenu`,
  showRequiresProfileModal: state`authentication.showRequiresProfileModal`,
  showOnboardingModal: state`app.showOnboardingModal`,
  isLoadingPage: state`app.isLoadingPage`,
  currentTeamModalChallengeKey: state`challenges.currentTeamModalChallengeKey`,
  showErrorModal: state`app.showErrorModal`,
  errorMessage: state`error`,
  showCO2ActivitiesInfoModal: state`app.showCO2ActivitiesInfoModal`,
  showTermsAndConditionModal: state`authentication.showTermsAndConditionsModal`,
  showLoginModal: state`authentication.showLoginModal`,
  showRegisterModal: state`authentication.showRegisterModal`,
  showForgotPasswordModal: state`authentication.showForgotPasswordModal`,
  showForgotPasswordConfirmationModal: state`authentication.showForgotPasswordConfirmationModal`,
  showMoreChallengeInfoModal: state`challenge.showMoreChallengeInfoModal`,
  showTeamChallengeJoinedModal: state`challenge.teamChallenge.showJoinedModal`,
  showJoinTeamModal: state`challenge.teamChallenge.showJoinTeamModal`,
  challengeType: state`challenge.type`,
  showTranslateModal: state`translate.showModal`,
  showFeedbackModal: state`app.showFeedbackModal`,
  activityModalKey: state`app.activityModalKey`,
  appClicked: signal`app.appClicked`,
  registerModalCancelled: signal`app.registerModalCancelled`,
  onboardingModalClicked: signal`app.onboardingModalClicked`,
  reportErrorClicked: signal`app.reportErrorClicked`,
  joinTeamChallengeClicked: signal`challenge.teamChallenge.joinChallengeClicked`,
  scrolled: signal`app.scrolled`
},
  class Mobile extends React.Component {

    /* eslint-disable react/no-set-state, react/no-did-update-set-state, no-undef */
    constructor(props) {
      super(props);
      this.state = {
        page: null,
        isLoadingFiles: true
      };
      this.wrapperElement = null;
      this.handleOnClick = this.handleOnClick.bind(this);
      this.setModuleComponent = this.setModuleComponent.bind(this);
      this.updateScroll = this.updateScroll.bind(this);
    }
    componentDidMount() {
      this.loadCurrentPage();
      window.addEventListener('scroll',
        utils.debounce(this.updateScroll, 200));
    }
    componentDidUpdate(prevProps, prevState) {
      if (
        (prevState.isLoadingInitialFiles && !this.state.isLoadingInitialFiles && !this.props.isAuthenticating) ||
        (prevProps.isAuthenticating && !this.props.isAuthenticating && !this.state.isLoadingInitialFiles)
      ) {
        document.querySelector('#loaderWrapper').className = 'hidden';
      }

      if (
        prevProps.currentPage !== this.props.currentPage
      ) {
        this.loadCurrentPage();
      }
    }
    componentWillUnmount() {
      window.removeEventListener('scroll', utils.debounce(this.updateScroll, 200));
    }
    isModalShown() {
      return (
        this.props.showCO2ActivitiesInfoModal ||
        this.props.showTermsAndConditionModal ||
        this.props.showLoginModal ||
        this.props.showRegisterModal ||
        this.props.showForgotPasswordModal ||
        this.props.showForgotPasswordConfirmationModal ||
        this.props.showMoreChallengeInfoModal ||
        this.props.showTeamChallengeJoinedModal ||
        this.props.showJoinTeamModal ||
        this.props.showTranslateModal ||
        this.props.showFeedbackModal ||
        this.props.showRequiresProfileModal ||
        this.props.activityModalKey ||
        this.props.showProviderErrorModal ||
        this.props.showNewVersionModal
      );
    }
    updateScroll() {
      if (!this.isModalShown()) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

        this.props.scrolled({page: this.props.currentPage, value: scrollTop});
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

      if (this.props.user && !this.isModalShown() && this.props.currentPage !== 'welcome') {
        layout.Header = DuckyHeader;
      }

      if (this.props.isAuthenticating) {
        layout.Loader = BackgroundLoader;
      }

      if (this.props.isLoadingPage || this.state.isLoadingFiles) {
        layout.Loader = DuckyLoader;
      }

      if (!this.state.isLoadingFiles && !this.props.isLoadingPage) {
        layout.Page = Page;
      }

      return layout;
    }
    renderContent() {
      const {Header, Page, Loader} = this.createLayout();

      if (this.props.showTermsAndConditionModal) {
        return <TermsAndConditionsModal />;
      }

      if (this.props.showLoginModal) {
        return <LoginModal />;
      }

      if (this.props.showRegisterModal) {
        return <RegisterModal />;
      }

      if (this.props.showForgotPasswordModal) {
        return <ForgotPasswordModal />;
      }

      if (this.props.showForgotPasswordConfirmationModal) {
        return <ForgotPasswordConfirmationModal />;
      }

      if (this.props.showCO2ActivitiesInfoModal) {
        return <CO2ActivitiesInfoModal />;
      }

      if (this.props.showProviderErrorModal) {
        return <ProviderErrorModal />;
      }

      if (this.props.showNewVersionModal) {
        return <NewVersionModal />;
      }

      if (this.props.showErrorModal) {
        return (
          <ErrorModal
            errorMessage={this.props.errorMessage}
            show={this.props.showErrorModal}
            onHide={() => location.reload()}
            onReport={() => this.props.reportErrorClicked()}
            />
          );
      }

      if (this.props.showOnboardingModal) {
        return (
          <OnboardingModal
            show={this.props.showOnboardingModal}
            onClose={() => this.props.onboardingModalClicked()}
            />
        );
      }

      if (this.props.showTranslateModal) {
        return <TranslateModal />;
      }

      if (this.props.showFeedbackModal) {
        return <FeedbackModal />;
      }

      if (this.props.showRequiresProfileModal) {
        return <RequiresProfileModal />;
      }

      return (
        <div>
          {Header ? <Header /> : null}
          {Page ? <Page /> : null}
          {Loader ? <Loader image /> : null}
          <CreateProfileModal />
          <Snackbar />
        </div>
      );
    }
    render() {
      return (
        <div
          className={classNames({
            [styles.wrapper]: Boolean(this.props.user &&
            this.props.currentPage !== 'welcome' && !this.isModalShown()),
            [styles.mainMenu]: !this.props.isSmall && this.props.showMainMenu
          })}
          onClick={this.handleOnClick}
          >
          {this.renderContent()}
        </div>
      );
    }
  }
);
