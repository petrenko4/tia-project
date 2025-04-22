import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/commonStyles.css';
import '../styles/tracklistStyles.css';
import { getTracks } from '../services/tracksService';
import { getReleases } from '../services/releaseService';
import ReleaseList from '../components/ReleaseList';

function MusicLibraryPage(props) {
    const [tracks, setTracks] = useState([]);
    const [releases, setReleases] = useState([]);
    const navigate = useNavigate();

    const fetchReleases = () => {
        getReleases()
            .then((releases) => {
                setReleases(releases);
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
        if (! props.authStatus) {
            props.setError("Not authenticated"),            
            navigate('/')
        }
        fetchTracks();
        fetchReleases();
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h1>My releases</h1>
            {releases.length > 0 ? (
                <ReleaseList releases={releases} />
            ) : (
                <p>No releases yet</p>
            )}
        </div>
    );
}

export default MusicLibraryPage;