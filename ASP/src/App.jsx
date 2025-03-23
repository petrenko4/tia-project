import { useState } from 'react'
import  Header  from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlaylistView from './pages/PlaylistView'
import BrowsingPage from './pages/BrowsingPage';
import './App.css'
import WelcomeScreen from './pages/WelcomeScreen';
import UploadMusic from './pages/UploadMusic';

function App() {
  const [count, setCount] = useState(0)

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
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
