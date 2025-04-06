import React, { useState } from 'react';
import { addTrack } from '../services/tracksService';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function UploadMusic() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [trackName, setTrackName] = useState('');
    const [releaseType, setReleaseType] = useState('');
    const [category, setCategory] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleTrackNameChange = (event) => {
        setTrackName(event.target.value);
    };

    const handleReleaseTypeChange = (event) => {
        setReleaseType(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const track = {
            track_id: crypto.randomUUID(),
            title: trackName,
            file: selectedFile,
            releaseType: releaseType,
            category: category,
        };
        addTrack(track)
            .then((response) => {
                console.log('Track added successfully:', response);
                navigate("/library");
            })
            .catch((error) => {
                console.error('Error adding track:', error);
            });
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Upload Music</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group">
                    <label htmlFor="fileInput">Choose file:</label>
                    <input type="file" id="fileInput" onChange={handleFileChange} className="form-control-file" />
                </div>
                <div className="form-group">
                    <label htmlFor="trackNameInput">Track name:</label>
                    <input type="text" id="trackNameInput" value={trackName} onChange={handleTrackNameChange} className="form-control" required />
                    <div className="invalid-feedback">Please enter a track name.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="releaseTypeSelect">Release type:</label>
                    <select id="releaseTypeSelect" value={releaseType} onChange={handleReleaseTypeChange} className="form-control" required>
                        <option value="">Select a release type</option>
                        <option value="album">Album</option>
                        <option value="track">Track</option>
                        <option value="ep">EP</option>
                    </select>
                    <div className="invalid-feedback">Please select a release type.</div>
                </div>
                <div className="form-group">
                    <label htmlFor="categorySelect">Category:</label>
                    <select id="categorySelect" value={category} onChange={handleCategoryChange} className="form-control" required>
                        <option value="">Select a category</option>
                        <option value="rock">Rock</option>
                        <option value="pop">Pop</option>
                        <option value="hip-hop">Hip-Hop</option>
                        <option value="electronic">Electronic</option>
                        <option value="other">Other</option>
                    </select>
                    <div className="invalid-feedback">Please select a category.</div>
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
            </form>
        </div>
    );
}

export default UploadMusic;