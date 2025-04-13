import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { getReleases, addRelease } from '../services/releaseService';

const CreateReleasePage = () => {
  const [releases, setReleases] = useState([]);
  const [releaseType, setReleaseType] = useState('');
  const [releaseName, setReleaseName] = useState('');
  const [category, setCategory] = useState('');

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
    fetchReleases();
  }, []);

  const handleReleaseTypeChange = (event) => {
    setReleaseType(event.target.value);
  };

  const handleReleaseNameChange = (event) => {
    setReleaseName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const release = {
      releaseType,
      releaseName,
      category,
    };
    addRelease(release)
      .then((response) => {
        console.log('Release added successfully:', response);
        fetchReleases(); // Refresh the releases list
      })
      .catch((error) => {
        console.error('Error adding release:', error);
      });
  };

  const categories = [
    { value: 'single', label: 'Single' },
    { value: 'release', label: 'Release' },
    { value: 'ep', label: 'EP' },
  ];

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
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="releaseNameInput">Release Name:</label>
          <input type="text" id="releaseNameInput" value={releaseName} onChange={handleReleaseNameChange} className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="categorySelect">Category:</label>
          <select id="categorySelect" value={category} onChange={handleCategoryChange} className="form-control">
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create Release</button>
      </form>
    </div>
  );
};

export default CreateReleasePage;