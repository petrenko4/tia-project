import React, { useState } from 'react';
import '../styles/commonStyles.css';
import '../styles/tracklistStyles.css';

function MusicLibraryPage() {
  const [musicFiles, setMusicFiles] = useState([
    {
      id: 1,
      title: 'Song 1',
      artist: 'Artist 1',
      album: 'Album 1',
      file: 'https://example.com/song1.mp3',
    },
    {
      id: 2,
      title: 'Song 2',
      artist: 'Artist 2',
      album: 'Album 2',
      file: 'https://example.com/song2.mp3',
    },
    {
      id: 3,
      title: 'Song 3',
      artist: 'Artist 3',
      album: 'Album 3',
      file: 'https://file-examples.com/storage/fe43f661cd67e82d2a11c0a/2017/11/file_example_MP3_700KB.mp3',
    },
  ]);

  return (
    <div className="container mt-5">
      <h1>My Music Library</h1>
      <div className="song-list">
        {musicFiles.map((file) => (
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