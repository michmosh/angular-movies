import { MovieActionsTypes, MovieActions } from "./actions";

export let initialState = [];

export function reducer(state=initialState, action: MovieActions) {  
   
    switch (action.type) {
        case MovieActionsTypes.GET_MOVIES: 
            let moviesArray = action.payload        
            return [...state ,...moviesArray ]
            
        case MovieActionsTypes.ADD_MOVIE: 
            return [...state, action.payload] ;

        case MovieActionsTypes.REMOVE_MOVIE: 
            let movie = action.payload   
            return state.filter((el)=>el.imdbID != movie.imdbID);
        
        case MovieActionsTypes.EDIT_MOVIE: 
            let editedMovie = action.payload  ;
            let indexToEdit =  state.findIndex((el)=>el.imdbID == editedMovie.imdbID);
            Object.assign(state[indexToEdit], editedMovie); 
            return state;
            
        default: 
            return state
    }
}