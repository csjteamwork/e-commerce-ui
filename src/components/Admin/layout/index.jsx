import React, { Component } from 'react';

import Header from './header';
import Leftnav from './leftnav';
import Footer from './footer';
import { verticalMenu } from './menu';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      leftNavOpen: true,
      userDropdown: false
    };
  }

  handleToggle() {
    this.setState({ leftNavOpen: !this.state.leftNavOpen });
  }

  handleUserToggle() {
    this.setState({ userDropdown: !this.state.userDropdown });
  }

  render() {
    const { children, history } = this.props;
    const { leftNavOpen, userDropdown } = this.state;

    return (
      <div className={`nav-fixed${!leftNavOpen ? ' sidenav-toggled' : ''}`}>
        <Header
          userDropdown={userDropdown}
          onToggle={() => this.handleToggle()}
          userDropdownToggle={() => this.handleUserToggle()}
        />
        <div id="layoutSidenav">
          <Leftnav history={history} menu={verticalMenu} />
          <div id="layoutSidenav_content">
            <main>{children}</main>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
