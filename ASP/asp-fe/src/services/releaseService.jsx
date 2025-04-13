function getReleases() {
    return fetch("/api/v1/releases").then(  // promise is resolved

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
    return await response.json();
}

export { getReleases, addRelease };