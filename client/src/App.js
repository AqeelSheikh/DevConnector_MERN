import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes, 
  useParams,
} from 'react-router-dom';
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Routing from "./components/routing/Routing";
import './App.css';

// redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<Routing />} />
      </Routes>
    </Router>
  </Provider>
  );
}

export default App;
