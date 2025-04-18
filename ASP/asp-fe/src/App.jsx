import { useState, useEffect } from 'react'
import  Header  from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaylistView from './pages/PlaylistView'
import CreateReleasePage from './pages/CreateReleasePage';
import BrowsingPage from './pages/BrowsingPage';
import MusicLibraryPage from './pages/MusicLibraryPage';
import './App.css'
import {getTracks} from './services/tracksService'
import WelcomeScreen from './pages/WelcomeScreen';
import UploadMusic from './pages/UploadMusic';

function App() {

  return (
    <>
      <div>
        <Header/>
      </div>
      <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path = "/"
            element={<WelcomeScreen/>}
          />
          <Route
            path="/playlists"
            element={<PlaylistView/>}
          />
          <Route 
            path="/browsing"
            element={<BrowsingPage/>}
          />
          <Route 
            path="/upload"
            element={<UploadMusic/>}
          />
          <Route 
            path="/library"
            element={<MusicLibraryPage/>}
          />
          <Route 
            path="/newRelease"
            element={<CreateReleasePage/>}
          />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
