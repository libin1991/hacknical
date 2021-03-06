import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import { PortalModal } from 'light-ui';
import styles from '../../../styles/mobile.css';
import Topbar from '../../shared/Topbar';
import { TABS } from 'UTILS/constant';
import locales, { getLocale } from 'LOCALES';
import MenuWrapper from '../../shared/MenuWrapper';

const tabs = locales('dashboard.tabs');
const locale = getLocale();

class Menus extends MenuWrapper {
  constructor(props) {
    super(props);
    this.state.menuActive = false;
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  componentDidUpdate(preProps) {
    const { pathname } = this.props.location;
    if (pathname !== preProps.location.pathname) {
      this.toggleMenu(false);
    }
  }

  toggleMenu(e) {
    this.setState({
      menuActive: !e ? false : !this.state.menuActive
    });
  }

  renderMenus() {
    const { login, changeActiveTab } = this.props;
    return TABS.map((tab, index) => (
      <NavLink
        key={index}
        to={`/${login}/${tab.id}`}
        className={styles.menu}
        activeClassName={styles.menuActive}
        onClick={() => changeActiveTab(tab.id)}
      >
        <i aria-hidden="true" className={`fa ${tab.icon}`} />
        &nbsp;&nbsp;
        {tab.name}
      </NavLink>
    ));
  }

  renderLanguageOptions() {
    const { languages } = this.state;
    if (!languages || !languages.length) return null;
    const languageDOMs = languages.map((language, index) => (
      <a
        key={index}
        href={`/?locale=${language.id}`}
        className={styles.languageOption}
      >
        {language.text}
      </a>
    ));
    return (
      <div className={cx(styles.menu, styles.languagesWrapper)}>
        <i className="fa fa-language" aria-hidden="true" />
        &nbsp;&nbsp;&nbsp;
        {languageDOMs}
      </div>
    );
  }

  render() {
    const { zen, menuActive } = this.state;
    const aboutUrl = `https://github.com/ecmadao/hacknical/blob/master/doc/ABOUT-${locale}.md`;
    return (
      <Topbar
        offsetTop={0}
        headroomClasses={{
          top: 'headroom--top-mobile',
          pinned: 'headroom--pinned-mobile'
        }}
        tabClassName={styles.menuTab}
        wrapperClassName={styles.menuBarWrapper}
        containerClassName={styles.menuBarContainer}>
        <div className={styles.menus}>
          <div className={styles.menuTopbar}>
            <div
              onClick={this.toggleMenu}
              className={styles.menuIcon}>
              <i className="fa fa-navicon" aria-hidden="true" />
            </div>
            <div className={styles.menuLogoBar}>
              hacknical
            </div>
          </div>
          <PortalModal showModal={menuActive}>
            <div className={styles.menuContainer}>
              <div className={styles.menuTop}>
                <div className={styles.menuLogo}>
                  hacknical
                </div>
                <div
                  onClick={this.toggleMenu}
                  className={styles.menuClose}>
                  <i className="fa fa-close" aria-hidden="true" />
                </div>
              </div>
              <div className={styles.menuZen}>{zen}</div>
              <div className={styles.menuWrapper}>
                {this.renderMenus()}
                <a href={aboutUrl} className={styles.menu}>
                  <i className="fa fa-info-circle" aria-hidden="true" />
                  &nbsp;&nbsp;
                  {tabs.about.text}
                </a>
                <div className={styles.menuBottom}>
                  {this.renderLanguageOptions()}
                  <a href="/user/logout" className={styles.menu}>
                    <i className="fa fa-sign-out" aria-hidden="true" />
                    &nbsp;&nbsp;
                    {tabs.logout.text}
                  </a>
                </div>
              </div>
            </div>
          </PortalModal>
        </div>
      </Topbar>
    );
  }
}

export default Menus;
