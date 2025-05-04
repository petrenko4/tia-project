import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteTrack } from '../services/tracksService';
import { useNavigate } from 'react-router-dom';
import { getPlaylists } from '../services/playlistService';
import { addTrackToPlaylist } from '../services/playlistService';

function Track({ track, onDelete, isAdmin, props }) {
    const [showModal, setShowModal] = useState(false);
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
    const [playlists, setPlaylists] = useState([]);
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

    const fetchPlaylists = () => {
        getPlaylists()
            .then((playlists) => {
                setPlaylists(playlists);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const handleAddToPlaylist = (playlistId) => {
        addTrackToPlaylist(playlistId, track.id)
            .then(() => {
                console.log("Track added successfully");
            })
            .catch((err) => {
                console.error("Failed to add track: track already exists", err.message);
                props.setError(err.message);
            });
        setShowPlaylistMenu(false);
    };

    return (
        <div className="card track-card p-3">
            <h5 className="card-title">{track.title}</h5>
            <p className="text-muted mb-1">By {track.username}</p>
            <p><strong>Category:</strong> {track.category}</p>
            <audio controls className="w-100 mb-2">
                <source src={track.file} type="audio/mpeg" />
            </audio>

            <div className="d-flex gap-2 flex-wrap">
                {isAdmin && (
                    <>
                        <button className="btn btn-warning btn-sm" onClick={() => navigate(`/edit`, { state: { track } })}>
                            Edit
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={confirmDelete}>
                            Delete
                        </button>
                    </>
                )}

                <div className="dropdown">
                    <button className="btn btn-primary btn-sm dropdown-toggle" onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}>
                        Add to Playlist
                    </button>
                    {showPlaylistMenu && (
                        <ul className="dropdown-menu show position-static border mt-2 p-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
                            {playlists.length > 0 ? (
                                playlists.map((pl) => (
                                    <li key={pl.id}>
                                        <button className="dropdown-item" onClick={() => handleAddToPlaylist(pl.id)}>
                                            {pl.name}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="dropdown-item text-muted">No playlists</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

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
                                <button className="btn btn-secondary btn-sm" onClick={cancelDelete}>Cancel</button>
                                <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Track;
