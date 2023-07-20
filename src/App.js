import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Encyclopedia from './components/Encyclopedia';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Encyclopedia />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
