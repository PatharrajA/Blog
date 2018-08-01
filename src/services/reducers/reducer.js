const initialState = {
    user: {},
    isLoggedIn: false,
    blog: [],
    token: ""
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
        default:
            break;
    }
}