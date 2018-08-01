export function isLoggedIn() {
    return {
        type: 'SET_LOGIN',
        isLoggedIn
    }
}

export function session(token) {
    return {
        type: "SET_SESSION",
        token
    }
}