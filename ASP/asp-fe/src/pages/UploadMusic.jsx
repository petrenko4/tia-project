import React, { useState, useEffect } from 'react';
import { addTrack } from '../services/tracksService';
import { useNavigate } from "react-router-dom";
import { getReleases } from '../services/releaseService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Upload.css';

function UploadMusic(props) {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [trackName, setTrackName] = useState('');
    const [releaseType, setReleaseType] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({});
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        if (!props.authStatus) {
            props.setError("Not authenticated"),
                navigate('/')
        }
        getReleases()
            .then((data) => {
                setReleases(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const releaseId = document.getElementById('releaseSelect').value;
        const track = {
            title: trackName,
            file: selectedFile,
            release_id: releaseId,
            category: category,
        };

        const validationErrors = validateForm(track);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            checkFileExists(track.file).then((exists) => {
                if (exists) {
                    setErrors({ file: 'File already exists' });
                } else {
                    addTrack(track);
                    navigate("/library");
                }
            });
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
        if (!track.release_id) {
            errors.release_id = 'Release is required';
        }
        console.log(errors); 
        return errors;
    };

    const checkFileExists = (file) => {
        const fileName = file.name;
        const url = `http://localhost:3000/uploads/${file.name}`;
        return fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
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
                <select id="categorySelect" value={category} onChange={handleCategoryChange} className="form-control">
                    <option value="">Select a category</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hiphop">Hip-Hop</option>
                    <option value="electronic">Electronic</option>
                    <option value="jazz">Jazz</option>
                    <option value="classical">Classical</option>
                    <option value="country">Country</option>
                    <option value="rnb">R&B</option>
                    <option value="others">Others</option>
                </select>
                <div className="form-group">
                    <label htmlFor="releaseSelect">Select a Release:</label>
                    <select id="releaseSelect" className="form-control">
                        <option value="">Select a release</option>
                        {releases.map((release) => (
                            <option key={release.id} value={release.id}>
                                {release.name}
                            </option>
                        ))}
                    </select>
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