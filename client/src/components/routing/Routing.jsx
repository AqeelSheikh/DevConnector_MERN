import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useParams,
} from 'react-router-dom';
import Alert from '../../components/layouts/Alert';
// import NotFound from '../layouts/NotFound';
import Login from '../../components/auth/Login';
import Register from '../../components/auth/Register';
import Dashboard from '../../components/dashboard/Dashboard';
import PrivateRoute from '../../components/routing/PrivateRoute';
import CreateProfile from '../../components/profile-form/CreateProfile';
import EditProfile from '../../components/profile-form/EditProfile';
import AddExperience from '../../components/profile-form/AddExperience';
import AddEducation from '../../components/profile-form/AddEducation';
import Profiles from '../../components/profiles/Profiles';
import Profile from '../../components/profile/Profile';
import Posts from '../../components/posts/Posts';
import Post from '../../components/post/Post';



const Routing = () => {
  function Section({ children }) {
    return <section className="container">{children}</section>;
  }
  return (
    <>
     <section className="alerts">
        <Alert />
      </section>
    <Routes>
   
      <Route
        path="/login"
        element={
          <Section>
            <Login />
          </Section>
        }
      />
      <Route
        path="/register"
        element={
          <Section>
            <Register />
          </Section>
        }
      />
      <Route
        path="/profiles"
        element={
          <Section>
            <Profiles />
          </Section>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <Section>
            <Profile />
          </Section>
        }
      />
      <Route
        element={
          <Section>
            <PrivateRoute />
          </Section>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/add-experience" element={<AddExperience />} />
        <Route path="/add-education" element={<AddEducation />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
      </Route>
    </Routes>
    </>);
};

export default Routing;
