import { useState, useEffect } from 'react'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaylistView from './pages/PlaylistView'
import CreateReleasePage from './pages/CreateReleasePage';
import BrowsingPage from './pages/BrowsingPage';
import MusicLibraryPage from './pages/MusicLibraryPage';
import './App.css'
import { getTracks } from './services/tracksService'
import WelcomeScreen from './pages/WelcomeScreen';
import UploadMusic from './pages/UploadMusic';
import SignupPage from './pages/SignupPage';
import { useNavigate } from "react-router-dom";
import Buttons from './components/Buttons';
import TrackEditPage from './pages/TrackEditPage';

function App() {
  const [error, setError] = useState('');
  const [authStatus, setAuthStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Header authStatus = {authStatus} error={error} setError={setError} setAuthStatus={setAuthStatus} isAdmin = {isAdmin} setIsAdmin = {setIsAdmin}/>
          <Buttons error={error} setError={setError} setAuthStatus={setAuthStatus} authStatus = {authStatus}/>
          <Routes>
            <Route
              path="/"
              element={<WelcomeScreen error={error} setError={setError} setAuthStatus={setAuthStatus} 
                        setIsAdmin = {setIsAdmin} isAdmin = {isAdmin}/>}
            />
            <Route
              path="/playlists"
              element={<PlaylistView error={error} setError={setError} setAuthStatus={setAuthStatus} authStatus={authStatus} />}
            />
            <Route
              path="/browsing"
              element={<BrowsingPage error={error} setError={setError} setAuthStatus={setAuthStatus} authStatus={authStatus} isAdmin = {isAdmin}/>}
            />
            <Route
              path="/upload"
              element={<UploadMusic error={error} setError={setError} setAuthStatus={setAuthStatus} authStatus={authStatus} />}
            />
            <Route
              path="/library"
              element={<MusicLibraryPage error={error} setError={setError} setAuthStatus={setAuthStatus} authStatus={authStatus} isAdmin = {isAdmin} />}
            />
            <Route
              path="/newRelease"
              element={<CreateReleasePage error={error} setError={setError} setAuthStatus={setAuthStatus} authStatus = {authStatus} />}
            />
            <Route
              path="/signup"
              element={<SignupPage error={error} setError={setError} setAuthStatus={setAuthStatus} />}
            />
            <Route
              path="/edit"
              element={<TrackEditPage error={error} setError={setError} setAuthStatus={setAuthStatus} 
                        authStatus = {authStatus} isAdmin = {isAdmin} setIsAdmin = {setIsAdmin}/>}  
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
