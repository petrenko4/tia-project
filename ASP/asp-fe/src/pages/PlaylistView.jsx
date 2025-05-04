import { useEffect, useState } from "react";
import { getPlaylists } from "../services/playlistService";
import { createPlaylist, deletePlaylist } from "../services/playlistService";
import { getTracksFromPlaylist } from "../services/playlistService";
import Track from "../components/Track";
import { useNavigate } from "react-router-dom";

function PlaylistView(props) {
    const [playlists, setPlaylists] = useState([]);
    const [trackCounts, setTrackCounts] = useState({});
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState("");
    const [activePlaylist, setActivePlaylist] = useState(null);
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.authStatus) {
            props.setError("Not authenticated"),
                navigate('/')
        }
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const data = await getPlaylists();
            setPlaylists(data);

            const counts = {};
            await Promise.all(
                data.map(async (pl) => {
                    const tracks = await getTracksFromPlaylist(pl.id);
                    counts[pl.id] = tracks.length;
                })
            );
            setTrackCounts(counts);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching playlists:", err);
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (newName.trim()) {
            await createPlaylist({ name: newName.trim() });
            setNewName("");
            setShowModal(false);
            fetchPlaylists(); // refresh list
        }
    };

    const handleDeletePlaylist = async (playlistId) => {
    try {
        await deletePlaylist(playlistId);
        if (activePlaylist?.id === playlistId) {
            setActivePlaylist(null); 
            setPlaylistTracks([]);
        }
        fetchPlaylists();
    } catch (error) {
        console.error("Error deleting playlist:", error);
    }
};

    const handleShowTracks = async (playlist) => {
        setActivePlaylist(playlist);
        const tracks = await getTracksFromPlaylist(playlist.id);
        setPlaylistTracks(tracks);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Playlists</h2>

            {loading ? (
                <p>Loading...</p>
            ) : playlists.length > 0 ? (
                <ul className="list-group mb-4">
                    {playlists.map((playlist) => (
                        <li
                            key={playlist.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div style={{ cursor: "pointer" }} onClick={() => handleShowTracks(playlist)}>
                                {playlist.name}
                                <span className="badge bg-primary rounded-pill ms-2">
                                    {trackCounts[playlist.id] ?? 0} tracks
                                </span>
                            </div>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeletePlaylist(playlist.id)}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No playlists found.</p>
            )}

            <div className="mb-4">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Create Playlist
                </button>
            </div>

            {/* Track list for selected playlist */}
            {activePlaylist && (
                <div className="mb-4">
                    <h4 className="mb-3">Tracks in "{activePlaylist.name}"</h4>
                    {playlistTracks.length > 0 ? (
                        playlistTracks.map((track) => (
                            <Track key={track.id} track={track} isAdmin={false} onDelete={() => { }} />
                        ))
                    ) : (
                        <p>No tracks in this playlist.</p>
                    )}
                </div>
            )}

            {/* Create Playlist Modal */}
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

export default PlaylistView;
