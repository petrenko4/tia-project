// Track.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteTrack } from '../services/tracksService';
import { useNavigate } from 'react-router-dom';

function Track({ track, onDelete, isAdmin }) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const confirmDelete = () => setShowModal(true);
    const cancelDelete = () => setShowModal(false);

    const handleDelete = async () => {
        try {
            await deleteTrack(track.id);
            onDelete(track.id);
            setShowModal(false);
        } catch (err) {
            console.error("Failed to delete", err);
        }
    };

    console.log("username in track: " + track.username);

    return (
        <div className="card track-card p-3">
            <h5 className="card-title">{track.title}</h5>
            <p className="text-muted mb-1">By {track.username}</p> {/* Added line */}
            <p><strong>Category:</strong> {track.category}</p>
            <audio controls className="w-100 mb-2">
                <source src={track.file} type="audio/mpeg" />
            </audio>
            {isAdmin && (
                <div className="d-flex gap-2">
                    <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit`, { state: { track } })}>
                        Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
                        Delete
                    </button>
                </div>
            )}

            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button className="close" onClick={cancelDelete}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete "{track.title}"?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary btn-sm" onClick={cancelDelete}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Track;
