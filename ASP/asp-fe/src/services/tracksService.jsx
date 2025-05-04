

function getTracks() {
    return fetch("/api/v1/tracks").then(  
        (response) => {
            if (!response.ok) { 
                if(response.status === 401 || response.status === 403){
                    throw new Error("Not authenticated");
                }
                throw new Error("Error getting tracks");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting tracks");
            return [];
        });
}

function updateTrack(track) {
    console.log("track in update: " + JSON.stringify(track));
    return fetch("/api/v1/tracks/", { method: "PUT", 
            body: JSON.stringify(track), 
            credentials: "include" ,
            headers: { "Content-Type": "application/json" }
        
        }).then(
        (response) => {
            if (!response.ok) { 
                throw new Error("Error getting tracks");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting tracks");
            return [];
        }
    );
}

function deleteTrack(track_id) {
    return fetch("/api/v1/tracks/?track_id=" + track_id, { method: "DELETE", credentials: "include" }).then(
        (response) => {
            if (!response.ok) { 
                throw new Error("Error getting tracks");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting tracks");
            return [];
        }
    );
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
    return await response.status;
}

export { getTracks, addTrack, deleteTrack, updateTrack };