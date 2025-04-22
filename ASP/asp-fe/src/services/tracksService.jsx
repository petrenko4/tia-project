

function getTracks() {
    return fetch("/api/v1/tracks").then(  
        (response) => {
            if (!response.ok) { 
                throw new Error("Error getting messages");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting messages");
            return [];
        });
}

async function addTrack(track) {

    const formData = new FormData();

    formData.append("id", crypto.randomUUID());
    formData.append("title", track.title);
    formData.append("file", track.file);
    formData.append("category", track.category);
    formData.append("release_id", track.release_id);
    
    const response = await fetch("/api/v1/tracks", {
        method: "POST",
        body: formData,
        credentials: "include"

    });
    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            throw new Error("Not authenticated");
        }
        throw new Error("Error adding new track");
    }
    return await response.json();
}

export { getTracks, addTrack };