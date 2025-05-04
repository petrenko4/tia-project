import { useEffect, useState } from "react";
import { getPlaylists } from "../services/playlistService";
import { createPlaylist } from "../services/playlistService";

export default function PlaylistView({ onCreate }) {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        getPlaylists()
            .then((data) => {
                setPlaylists(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching releases:", err);
                setLoading(false);
            });
    }, []);

    const handleCreate = () => {
        if (newName.trim()) {
            createPlaylist({ name: newName.trim() });
            setNewName("");
            setShowModal(false);
        }
    };

    console.log("playlists: ", playlists);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Playlists</h2>

            {loading ? (
                <p>Loading...</p>
            ) : playlists.length > 0 ? (
                <div className="row">
                    {playlists.map((playlist) => (
                        <div key={playlist.id} className="col-md-4 mb-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{playlist.name}</h5>
                                    <p className="card-text text-muted">
                                        {playlist.trackCount || 0} tracks
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No playlists found.</p>
            )}

            <div className="mt-4">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Create Playlist
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">New Playlist</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter playlist name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={handleCreate}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
