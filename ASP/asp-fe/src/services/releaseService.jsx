function addRelease(release) {
        return fetch("/api/v1/releases", {
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                },
                body: JSON.stringify(release),
        })
                .then((response) => response.json())
                .catch((error) => console.error(error));
}