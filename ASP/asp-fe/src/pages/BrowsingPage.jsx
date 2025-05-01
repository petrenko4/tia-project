import React, { useState, useEffect } from 'react';
import { getTracks } from '../services/tracksService';
import { getReleasesAll } from '../services/releaseService';
import ReleaseList from '../components/ReleaseList';
import TrackList from '../components/TrackList';
import { useNavigate } from 'react-router-dom';

function BrowsingPage(props) {
    const [tracks, setTracks] = useState([]);
    const [releases, setReleases] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchMode, setSearchMode] = useState('tracks'); // 'tracks' or 'releases'

    const navigate = useNavigate();

    console.log("browse props: " + JSON.stringify(props));

    useEffect(() => {
        if (!props.authStatus) {
            props.setError("Not authenticated"),
                navigate('/')
        }
        getTracks()
            .then(data => {
                if (data.error) throw new Error(data.error);
                setTracks(data);
            })
            .catch(error => console.error(error));

        getReleasesAll()
            .then(data => {
                if (data.error) throw new Error(data.error);
                setReleases(data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleModeChange = (event) => {
        setSearchMode(event.target.value);
        setSearchTerm(''); // clear search when switching modes
    };

    const filteredTracks = tracks.filter((track) =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredReleases = releases.filter((release) =>
        release.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1>Music Browser</h1>

            {/* Search Controls */}
            <div className="form-group mb-3">
                <label htmlFor="searchModeSelect">Search by:</label>
                <select
                    id="searchModeSelect"
                    value={searchMode}
                    onChange={handleModeChange}
                    className="form-control"
                >
                    <option value="tracks">Tracks</option>
                    <option value="releases">Releases</option>
                </select>
            </div>

            <div className="form-group mb-4">
                <input
                    type="text"
                    placeholder={`Search by ${searchMode === 'tracks' ? 'song title' : 'release name'}...`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                />
            </div>

            {/* Results */}
            {searchMode === 'tracks' ? (
                <TrackList tracks={filteredTracks} isAdmin = {props.isAdmin}/>
            ) : (
                <ReleaseList releases={filteredReleases} isAdmin = {props.isAdmin}/>
            )}
        </div>
    );
}

export default BrowsingPage;
