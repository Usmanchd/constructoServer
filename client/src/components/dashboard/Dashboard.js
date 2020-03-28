import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Redirect, Switch, Route } from 'react-router-dom';

import Project from '../Project/Project';

import * as ROUTES from '../../constants/routes';

import ProjectList from '../Project/ProjectList';
import ProjectDetails from '../Project/ProjectDetails';
import './dashboard.css';

class Dashboard extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="landing-page">
        <Switch>
          <Route
            path={ROUTES.DETAILS}
            render={props => <ProjectDetails {...this.props} {...props} />}
          />

          <Route path={ROUTES.LIST}>
            <ProjectList />
          </Route>

          <Route path="/">
            <Project />
          </Route>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Dashboard);
