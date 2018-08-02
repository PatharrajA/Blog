export function isLoggedIn() {
    return {
        type: "SET_LOGIN",
        isLoggedIn
    }
}

export function session(token) {
    document.cookie = "token=" + token;
    window.sessionStorage.token = token;
    return {
        type: "SET_SESSION",
        token
    }
}


export function user(user) {
    return {
        type: "SET_USER",
        user
    }
}

export function loader(load) {
    return {
        type: "SET_LOAD",
        load
    }
}