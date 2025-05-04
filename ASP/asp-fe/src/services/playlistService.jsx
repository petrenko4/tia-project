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

export { getPlaylists, createPlaylist };