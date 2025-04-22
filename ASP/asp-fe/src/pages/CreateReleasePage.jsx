import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { getReleases, addRelease } from '../services/releaseService';
import { useNavigate } from 'react-router-dom';


const CreateReleasePage = (props) => {
    const [releases, setReleases] = useState([]);
    const [releaseType, setReleaseType] = useState('');
    const [releaseName, setReleaseName] = useState('');
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

    useEffect(() => {
        if (! props.authStatus) {
            props.setError("Not authenticated"),            
            navigate('/')
        }
        fetchReleases();
    }, []);

    const handleReleaseTypeChange = (event) => {
        setReleaseType(event.target.value);
    };

    const handleReleaseNameChange = (event) => {
        setReleaseName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const release = {
            releaseType,
            releaseName,
        };
        addRelease(release)
            .then((response) => {
                console.log('Release added successfully:', response);
                fetchReleases(); // Refresh the releases list
                navigate("/library");
            })
            .catch((error) => {
                console.error('Error adding release:', error);
            });
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Create Release</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="releaseTypeSelect">Release Type:</label>
                    <select id="releaseTypeSelect" value={releaseType} onChange={handleReleaseTypeChange} className="form-control">
                        <option value="">Select a release type</option>
                        <option value="track">Track</option>
                        <option value="album">Album</option>
                        <option value="ep">EP</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="releaseNameInput">Release Name:</label>
                    <input type="text" id="releaseNameInput" value={releaseName} onChange={handleReleaseNameChange} className="form-control" />
                </div>
                {props.error.title && (
                    <div className="alert alert-danger mt-2">
                        {props.error.title}
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Create Release</button>
            </form>
        </div>
    );
};

export default CreateReleasePage;