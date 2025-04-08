import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/commonStyles.css';
import '../styles/tracklistStyles.css';
import { getTracks } from '../services/tracksService';
import { TrackList } from '../components/TrackList';

function MusicLibraryPage() {
    const [tracks, setTracks] = useState([]);
    const navigate = useNavigate();

    const fetchTracks = () => {
        getTracks()
            .then((tracks) => {
                setTracks(tracks);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchTracks();
    }, []);

    useEffect(() => {
        fetchTracks();
    }, [navigate]);


    return (
        <div className="container mt-5">
            <h1>My Music Library</h1>
            <TrackList tracks={tracks}></TrackList>
        </div>
    );
}

export default MusicLibraryPage;