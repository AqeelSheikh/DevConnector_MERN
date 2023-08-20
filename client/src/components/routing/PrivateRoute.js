import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  if (loading) {
    // Add loading state or spinner here if needed
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
