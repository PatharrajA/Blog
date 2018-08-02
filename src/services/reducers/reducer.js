const initialState = {
    user: {},
    isLoggedIn: false,
    blog: [],
    token: "",
    loader: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state,
                isLoggedIn: true
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_BLOG':
            return {
                ...state,
                blog: action.blog
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            }
        case 'SET_SESSION':
            return {
                ...state,
                token: action.token
            }
        case 'SET_LOAD':
            return {
                ...state,
                loader: action.load
            }
        default:
            break;
    }
}