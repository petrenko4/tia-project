function getReleases() {
    return fetch("/api/v1/releases").then(  

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
function getReleasesAll() {
    return fetch("/api/v1/releases/?tagAll=true").then(  // promise is resolved

        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                
                throw new Error("Error getting releases");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting releases");
            return [];
        });
}
function deleteRelease(release_id) {
    console.log("delete release called");
    return fetch("/api/v1/releases/?release_id=" + release_id, { method: "DELETE", credentials: "include" }).then(
        (response) => {
            if (!response.ok) { 
                throw new Error("Error deleting release");
            }
            console.log("release deleted");
            return response.json();
        }).catch((error) => {               
            console.log("Error deleting release");
            return [];
        }
    );
}
function getTracksFromRelease(release_id) {
    return fetch("/api/v1/releases/?release_id=" + release_id).then(  // promise is resolved
        (response) => {
            if (!response.ok) { // HTTP status code NOT between 200-299
                if(response.status === 401 || response.status === 403){
                    throw new Error("Not authenticated");
                }  
                if(response.status === 400){
                    throw new Error("All fields must be filled.");
                }
                throw new Error("Error getting messages");
            }
            return response.json();
        }).catch((error) => {               
            console.log("Error getting messages");
            return [];
        });
}

async function addRelease(release) {

    const releaseData = {
        id: crypto.randomUUID(),
        releaseName: release.releaseName,
        type: release.releaseType,
        tracks: {}
    }
    console.log("request sent /releases");
    console.log(JSON.stringify(releaseData));
    const response = await fetch("/api/v1/releases", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(releaseData),
        credentials: "include"
    });
    if (!response.ok) {
        throw new Error("Error adding new release");
    }
    return await response.status;
}

export { getReleases, addRelease, getTracksFromRelease, getReleasesAll, deleteRelease };