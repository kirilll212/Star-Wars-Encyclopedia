import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Encyclopedia from './components/Encyclopedia';
import Login from './components/Auth-Reg-Form/form/Login'
import Signup from './components/Auth-Reg-Form/form/Signup'
import Password from './components/Auth-Reg-Form/form/password'
import InformationPage from './components/information page/informationPage';
import { Provider } from 'react-redux';
import store from './redux/store';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}> 
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path='/Signup'
              element={<Signup />}
            />
            <Route
              path='password'
              element={<Password />}
            />
            <Route
              path='/Encyclopedia'
              element={<Encyclopedia />}
            />
            <Route
              path='/informationPage'
              element={<InformationPage />}
            />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
