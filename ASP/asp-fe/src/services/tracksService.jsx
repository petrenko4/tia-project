

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

function addTrack(track) {
    return fetch("/api/v1/tracks", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(track)
    })
        .then((response) => {  // promise is resolved
            if (!response.ok) {
                // "unauthorized" or "unauthenticated" HTTP status
                if (response.status === 401 || response.status === 403) {
                    throw new Error("Not authenticated");
                }   
                // other error HTTP status
                throw new Error("Error adding new message");
            }  
            naviga     
        })
       
}

export { getTracks, addTrack };