function getPlaylists() {
    return fetch('/api/v1/playlists').then(
        (response) => {
            if (!response.ok) { 
                if(response.status === 401 || response.status === 403){
                    throw new Error("Not authenticated");
                }
                throw new Error("Error getting playlists");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting playlists");
            return [];
        }
    )

}

async function createPlaylist(playlist) {

    const playlistData = {
        id: crypto.randomUUID(),
        name: playlist.name
    }
    const response = await fetch('/api/v1/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(playlistData),
        credentials: "include"
    })
    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new Error("Not authenticated");
        }
        throw new Error("Error creating playlist");
    }
    return await response.status;   
}

function getTracksFromPlaylist(playlist_id) {
    return fetch("/api/v1/playlists/?playlist_id=" + playlist_id).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if(response.status === 401 || response.status === 403){
                    throw new Error("Not authenticated");
                }  
                if(response.status === 400){
                    throw new Error("All fields must be filled.");
                }
                throw new Error("Error getting tracks from playlist");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting tracks from playlist");
            return [];
        });
}

function addTrackToPlaylist(playlist_id, track_id) {
    return fetch("/api/v1/playlists/?playlist_id=" + playlist_id + "&track_id=" + track_id, { method: "POST", credentials: "include" }).then(
        (response) => {
            if (!response.ok) { 
                if(response.status === 401 || response.status === 403){
                    throw new Error("Not authenticated");
                }
                throw new Error("Error adding tracks to pllaylist");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error adding tracks to playlist");
            throw new Error("track already exists in playlist");
            return []
        }
    );
}

function deletePlaylist(playlist_id) {
    return fetch("/api/v1/playlists/?playlist_id=" + playlist_id, { method: "DELETE", credentials: "include" }).then(
        (response) => {
            if (!response.ok) { 
                throw new Error("Error deleting playlist");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error deleting playlist");
            return [];
        }
    );
}

export { getPlaylists, createPlaylist, getTracksFromPlaylist, addTrackToPlaylist, deletePlaylist };