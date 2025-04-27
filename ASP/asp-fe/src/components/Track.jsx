// Track.jsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteTrack } from '../services/tracksService';

function Track({ track, onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = () => setShowModal(true);
  const cancelDelete = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      // Call the parent onDelete function to update the list
      await deleteTrack(track.id); // Make sure you call the service function to delete the track
      onDelete(track.id); // Notify the parent to remove the track from the state
      setShowModal(false); // Close the modal after deleting
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  return (
    <div className="card track-card p-3">
      <h5 className="card-title">{track.title}</h5>
      <p><strong>Category:</strong> {track.category}</p>
      <audio controls className="w-100 mb-2">
        <source src={track.file} type="audio/mpeg" />
      </audio>
      <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
        Delete
      </button>

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
