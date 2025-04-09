import React, { useState } from 'react';
import { addTrack } from '../services/tracksService';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function UploadMusic() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [trackName, setTrackName] = useState('');
  const [releaseType, setReleaseType] = useState('');
  const [releaseName, setReleaseName] = useState('');
  const [category, setCategory] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const tracks = selectedFiles.map((file) => ({
      title: trackName,
      file,
      releaseType,
      category,
      length: getLengthFromAudioFile(file),
    }));

    const validationErrors = validateForm(tracks);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      addTracks(tracks);
      navigate("/library");
    }
  };

  const validateForm = (tracks) => {
    const errors = {};
    if (tracks.length === 0) {
      errors.tracks = 'Please select at least one file';
    }
    if (!trackName) {
      errors.trackName = 'Track name is required';
    }
    if (!releaseType) {
      errors.releaseType = 'Release type is required';
    }
    if (!category) {
      errors.category = 'Category is required';
    }
    if ((releaseType === 'album' || releaseType === 'ep') && !releaseName) {
      errors.releaseName = 'Release name is required';
    }
    return errors;
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const newFiles = Array.from(files).map((file) => file);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleReleaseTypeChange = (event) => {
    const newReleaseType = event.target.value;
    setReleaseType(newReleaseType);
    if (newReleaseType === 'single') {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Upload Music</h1>
      <form onSubmit={handleSubmit} className="needs-validation" noValidate>
        <div className="form-group">
          <label htmlFor="fileInput">Choose file(s):</label>
          <input type="file" id="fileInput" onChange={handleFileChange} multiple={releaseType === 'album' || releaseType === 'ep'} className="form-control-file" />
          {errors.tracks && (
            <div className="alert alert-danger mt-2">
              {errors.tracks}
            </div>
          )}
          {selectedFiles.length > 0 && (
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="trackNameInput">Track name:</label>
          <input type="text" id="trackNameInput" value={trackName} onChange={(event) => setTrackName(event.target.value)} className="form-control" required />
          {errors.trackName && (
            <div className="alert alert-danger mt-2">
              {errors.trackName}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="releaseTypeSelect">Release type:</label>
          <select id="releaseTypeSelect" value={releaseType} onChange={handleReleaseTypeChange} className="form-control" required>
            <option value="">Select a release type</option>
            <option value="single">Single</option>
            <option value="album">Album</option>
            <option value="ep">EP</option>
          </select>
          {errors.releaseType && (
            <div className="alert alert-danger mt-2">
              {errors.releaseType}
            </div>
          )}
        </div>
        {(releaseType === 'album' || releaseType === 'ep') && (
          <div className="form-group">
            <label htmlFor="releaseNameInput">Release name:</label>
            <input type="text" id="releaseNameInput" value={releaseName} onChange={(event) => setReleaseName(event.target.value)} className="form-control" required />
            {errors.releaseName && (
              <div className="alert alert-danger mt-2">
                {errors.releaseName}
              </div>
            )}
          </div>
        )}
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