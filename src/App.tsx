import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { useGetCharacters } from './core/graphQL/request';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import CharactersList from './components/characters/characters-list';
import CharacterDetail from './components/characters/character-detail';
import FavouriteCharacters from './components/characters/favourite-characters';
import NotFound from './components/generic/not-found';
import {FavCountContext} from './core/context/app-context';

function App() {
  const [favCounter, setFavCounter] = React.useState<number>(0);
  return (
    <FavCountContext.Provider value={{favCount: favCounter, setFavCount: setFavCounter}}>
    <div className="App bg-dark" >
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} >
               <Route index element={<CharactersList />} />
               <Route path='character/:id' element={<CharacterDetail />} />
               <Route path='favourite' element={<FavouriteCharacters />} />
               <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
      </BrowserRouter>

    </div>
    </FavCountContext.Provider>
  );
}

export default App;
