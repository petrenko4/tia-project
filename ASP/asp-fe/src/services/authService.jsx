
function signUp(username, email, password) {

    const userData = {
        id: crypto.randomUUID(),
        username,
        email,
        password
    }

    return fetch("/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include"
    })
        .then((response) => {  // promise is resolved
            if (!response.ok) {
                // user already exists
                if (response.status === 409) {
                    throw new Error("User already exists");
                }
                throw new Error("Error signing up");
            }
        })
}

function login(username, password) {
    return fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include"
    })
        .then((response) => {  // promise is resolved
            if (!response.ok) {
                // invalid password or user does not exist
                if (response.status === 401) {
                    throw new Error("Invalid credentials");
                }
                throw new Error("Error logging in");
            }
            return response.json();
        })
}

function logout() {
    return fetch("/api/v1/auth/logout", { method: "DELETE", credentials: "include" })
        .then((response) => {  // promise is resolved
            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("Bad request - session does not exist");
                }
                throw new Error("Error logging out");
            }
        })

}

export { login, logout, signUp };