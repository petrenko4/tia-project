import React, { useState, useEffect } from 'react';
import '../styles/commonStyles.css';
import '../styles/tracklistStyles.css';
import { getTracks } from '../services/tracksService';
import {TrackList} from '../components/TrackList';

function MusicLibraryPage() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks()
      .then((tracks) => {
        setTracks(tracks);
        console.log('Tracks set:', tracks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Music Library</h1>
      <TrackList tracks={tracks}></TrackList>
    </div>
  );
}

export default MusicLibraryPage;