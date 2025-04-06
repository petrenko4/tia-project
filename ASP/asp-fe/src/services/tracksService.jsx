

function getTracks() {
    return fetch("/api/v1/tracks").then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                throw new Error("Error getting messages");
            }
            return response.json();
        }).catch((error) => {               // promise is rejected  
            // Better way would be to throw error here and let the 
            // client handle (e.g. show error message)
            // Returning empty array for simplicity only!
            console.log("Error getting messages");
            return [];
        });
}

async function addTrack(track) {
    const formData = new FormData();
    formData.append("title", track.title);
    formData.append("file", track.file); // this is the actual .mp3 file
    formData.append("releaseType", track.releaseType);
    formData.append("category", track.category);

    const response = await fetch("/api/v1/tracks", {
        method: "POST",
        body: formData, // no JSON.stringify
        credentials: "include" // still keeps cookies/session
        // Note: DO NOT set Content-Type header manually; browser will do it
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