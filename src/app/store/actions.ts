import { Action } from '@ngrx/store'

export enum MovieActionsTypes {  
    GET_MOVIES = 'GET_MOVIES',
    ADD_MOVIE = 'ADD_MOVIE',
    REMOVE_MOVIE = 'REMOVE_MOVIE' , 
    EDIT_MOVIE = "EDIT_MOVIE"
}

export class RemoveMovie implements Action{
    readonly type = MovieActionsTypes.REMOVE_MOVIE;
    constructor(public payload: any){}
}

export class AddMovie implements Action{
    readonly type = MovieActionsTypes.ADD_MOVIE;
    constructor(public payload: any){}
}

export class GetMovies implements Action{
    readonly type = MovieActionsTypes.GET_MOVIES;
    constructor(public payload: any){}
}

export class EditMovie implements Action{
    readonly type = MovieActionsTypes.EDIT_MOVIE;
    constructor(public payload: any){}
}

export type MovieActions =  RemoveMovie | AddMovie | GetMovies | EditMovie ;