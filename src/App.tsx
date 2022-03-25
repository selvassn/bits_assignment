import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { useGetCharacters } from './core/graphQL/request';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import CharactersList from './components/characters/characters-list';
import CharacterDetail from './components/characters/character-detail';

function App() {
  return (
    <div className="App bg-dark" >
      {/* <header className="App-header">
       Ricky - Morty - APP
      </header> */}
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} >
               <Route index element={<CharactersList />} />
               <Route path='character/:id' element={<CharacterDetail />} />
            </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
