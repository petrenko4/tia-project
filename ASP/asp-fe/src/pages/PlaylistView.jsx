import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserPlaylists(props) {
    const [playlists, setPlaylists] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (!props.authStatus) {
            props.setError("Not authenticated"),
                navigate('/')
        }
        fetch("/api/user/playlists")
            .then((res) => res.json())
            .then((data) => setPlaylists(data))
            .catch((error) => console.error("Error fetching playlists:", error));
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Your Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlists.length > 0 ? (
                    playlists.map((playlist) => (
                        <div key={playlist.id} className="border p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold">{playlist.name}</h3>
                            <p className="text-sm text-gray-500">{playlist.trackCount} tracks</p>
                            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                                View Playlist
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No playlists found.</p>
                )}
            </div>
        </div>
    );
}