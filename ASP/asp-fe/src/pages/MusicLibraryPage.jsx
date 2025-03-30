import React, { useState, useEffect } from 'react';
import '../styles/commonStyles.css';
import '../styles/tracklistStyles.css';
import { getTracks } from '../services/tracksService';

function MusicLibraryPage() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks()
      .then((tracks) => {
        setTracks(tracks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1>My Music Library</h1>
      <div className="song-list">
        {tracks.map((file) => (
          <div key={file.id} className="song-box">
            <div className="song-info">
              <h2>{file.title}</h2>
              <p>Artist: {file.artist}</p>
              <p>Album: {file.album}</p>
            </div>
            <div className="audio-player">
              <audio controls>
                <source src={file.file} type="audio/mpeg" />
              </audio>
              <div className="player-controls">
                <button className="play-pause-button"></button>
                <button className="volume-button"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MusicLibraryPage;