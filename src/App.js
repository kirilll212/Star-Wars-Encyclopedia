import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Encyclopedia from './components/Encyclopedia';
import AddCharacterForm from './components/add-character/AddCharacterForm';

const App = () => {
  const [characters, setCharacters] = useState([]);

  const addCharacter = (newCharacter) => {
    setCharacters([...characters, newCharacter]);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Encyclopedia characters={characters} />}
          />
          <Route
            path="/add-character"
            element={<AddCharacterForm addCharacter={addCharacter} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
