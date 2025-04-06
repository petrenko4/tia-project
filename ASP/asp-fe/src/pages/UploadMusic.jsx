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
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        const track = {
            title: trackName,
            file: selectedFile,
            releaseType: releaseType,
            category: category,
        };

        const validationErrors = validateForm(track);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            addTrack(track);
            navigate("/library");
        }
    };

    const validateForm = (track) => {
        const errors = {};
        if (!track.title) {
            errors.title = 'Track name is required';
        }
        if (!track.file) {
            errors.file = 'File is required';
        }
        if (!track.releaseType) {
            errors.releaseType = 'Release type is required';
        }
        if (!track.category) {
            errors.category = 'Category is required';
        }
        return errors;
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">Upload Music</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="form-group">
                    <label htmlFor="fileInput">Choose file:</label>
                    <input type="file" id="fileInput" onChange={(event) => setSelectedFile(event.target.files[0])} className="form-control-file" />
                    {errors.file && (
                        <div className="alert alert-danger mt-2">
                            {errors.file}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="trackNameInput">Track name:</label>
                    <input type="text" id="trackNameInput" value={trackName} onChange={(event) => setTrackName(event.target.value)} className="form-control" required />
                    {errors.title && (
                        <div className="alert alert-danger mt-2">
                            {errors.title}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="releaseTypeSelect">Release type:</label>
                    <select id="releaseTypeSelect" value={releaseType} onChange={(event) => setReleaseType(event.target.value)} className="form-control" required>
                        <option value="">Select a release type</option>
                        <option value="album">Album</option>
                        <option value="track">Track</option>
                        <option value="ep">EP</option>
                    </select>
                    {errors.releaseType && (
                        <div className="alert alert-danger mt-2">
                            {errors.releaseType}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="categorySelect">Category:</label>
                    <select id="categorySelect" value={category} onChange={(event) => setCategory(event.target.value)} className="form-control" required>
                        <option value="">Select a category</option>
                        <option value="rock">Rock</option>
                        <option value="pop">Pop</option>
                        <option value="hip-hop">Hip-Hop</option>
                        <option value="electronic">Electronic</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && (
                        <div className="alert alert-danger mt-2">
                            {errors.category}
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">Upload</button>
                {Object.keys(errors).length > 0 && (
                    <div className="alert alert-danger mt-2">
                        Please fix the errors above before submitting.
                    </div>
                )}
            </form>
        </div>
    );
}

export default UploadMusic;