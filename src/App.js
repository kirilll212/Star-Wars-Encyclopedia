import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Encyclopedia from './components/Encyclopedia';

const App = () => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = (newCharacter) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Encyclopedia characters={characters} addCharacter={addCharacter} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;