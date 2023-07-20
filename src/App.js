import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Encyclopedia from './components/Encyclopedia';
import Login from './components/Auth-Reg-Form/form/Login'
import Signup from './components/Auth-Reg-Form/form/Signup'
import Password from './components/Auth-Reg-Form/form/password'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
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
            path='/Encyclopedia'
            element={<Encyclopedia />}
          />
          <Route
            path='password'
            element={<Password />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
