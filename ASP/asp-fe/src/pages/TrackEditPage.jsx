import React, { useState, useEffect } from 'react';
import { updateTrack } from '../services/tracksService';
import { useLocation } from 'react-router-dom';
import { getReleases } from '../services/releaseService';
import { useNavigate } from 'react-router-dom';

function TrackEditPage(props) {
    const { state } = useLocation();
    const track = state?.track;
    const [releases, setReleases] = useState([]);
    const [title, setTitle] = useState(track.title);
    const [category, setCategory] = useState(track.category);
    const [releaseId, setReleaseId] = useState(track.release_id || '');
    const navigate = useNavigate();

    if (!track) {
        return <p>No track data provided.</p>;
    }

    useEffect(() => {
        if (!props.authStatus) {
            props.setError("Not authenticated"),
                navigate("/");
        }
        if (!props.isAdmin) {
            props.setError("Only admin can edit tracks."),
                navigate("/library");
        }
        getReleases()
            .then((data) => {
                setReleases(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedTrack = {
                ...track,
                title,
                category,
                release_id: releaseId
            };
            console.log(updatedTrack);
            await updateTrack(updatedTrack);
            alert("Track updated successfully!");
        } catch (err) {
            console.error("Error updating track:", err);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Track</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Track Title</label>
                    <input
                        className="form-control"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label>Category</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
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
                </div>

                <div className="form-group">
                    <label htmlFor="releaseSelect">Select a Release:</label>
                    <select id="releaseSelect" className="form-control" value={releaseId}
                        onChange={e => setReleaseId(e.target.value)}>
                        <option value="">Select a release</option>
                        {releases.map((release) => (
                            <option key={release.id} value={release.id}>
                                {release.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        </div>
    );
}

export default TrackEditPage;
