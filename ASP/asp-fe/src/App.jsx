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
import SignupPage from './pages/SignupPage';

function App() {
  const [error, setError] = useState('');
  const [authStatus, setAuthStatus] = useState(false);

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
            element={<WelcomeScreen error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
          <Route
            path="/playlists"
            element={<PlaylistView error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
          <Route 
            path="/browsing"
            element={<BrowsingPage error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
          <Route 
            path="/upload"
            element={<UploadMusic error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
          <Route 
            path="/library"
            element={<MusicLibraryPage error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
          <Route 
            path="/newRelease"
            element={<CreateReleasePage error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
          <Route 
            path="/signup"
            element={<SignupPage error = {error} setError = {setError} setAuthStatus = {setAuthStatus}/>}
          />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
