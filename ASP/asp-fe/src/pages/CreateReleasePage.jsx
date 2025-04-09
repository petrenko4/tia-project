import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const CreateReleasePage = () => {
  const [releaseType, setReleaseType] = useState('');
  const [releaseName, setReleaseName] = useState('');

  const handleReleaseTypeChange = (event) => {
    setReleaseType(event.target.value);
  };

  const handleReleaseNameChange = (event) => {
    setReleaseName(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">Create Release</h1>
      <form>
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
        <button type="submit" className="btn btn-primary">Create Release</button>
      </form>
    </div>
  );
};

export default CreateReleasePage;