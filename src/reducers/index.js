const initialValue = {
    heroes: [],
    heroesLoadingStatus: "idle"
}

const reducer = (state = initialValue, action) => {
    const findState = {
        'HEROES_FETCHING': {
            ...state,
            heroesLoadingStatus: "loading"
        },
        'HEROES_FETCHED': {
            ...state,
            heroes: action.payload,
            heroesLoadingStatus: "idle"
        },
        'HEROES_FETCHING_ERROR': {
            ...state,
            heroesLoadingStatus: "error"
        }
    }
    
    return findState[action.type] || state;
}

export default reducer;
