import { Injectable , EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http' ; 
import {Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {Movie} from '../model/movie.model';
import { Store , select } from '@ngrx/store';
@Injectable()
export class MoviesService {
  url: string = "http://www.omdbapi.com/";
  apiKey:string = "cd8bf949";
  initialMovieTitle:string = "dog";
  deleteEmitter: EventEmitter<any> = new EventEmitter<any>();
  movieEmitter: EventEmitter<any> = new EventEmitter<any>();
  moviesArray:Array<Movie> ;
  constructor(private http : HttpClient , private store :Store<any>) {}

  getMovies():Observable<any>{
    this.store.select('movie').subscribe((movies)=> this.moviesArray = movies);
    return this.http.get<Array<Movie>>(`${this.url}?apikey=${this.apiKey}&s=${this.initialMovieTitle}`)
      .map(res=>{
        return res; 
      })
  }

  getMovieById(id:string , index:number){
    return this.http.get<Movie>(`${this.url}?apikey=${this.apiKey}&i=${id}`).map(res=>{
      if(res['Response'] == "False") { // allow edit a movie that the user added 
        return this.moviesArray[index];
      }else{
        return res;
      }
    })
  }

  addMovie(movie?){
   let imdbID = Math.floor(Math.random() * 1000); // mock id from server 
   movie.imdbID = movie.id = imdbID;
   this.movieEmitter.emit({action:"add" , movie:movie});
  }

  editMovie(movie , imdbID){
    let index = this.moviesArray.findIndex(el=>{
      return el.imdbID ===  imdbID
    })
    movie.imdbID = imdbID;
    this.movieEmitter.emit({action:"edit" , movie:movie , index : index});
  }

  deleteMovie(movie:Movie):void{
    // send and recieve delete response from server 
    let serverResponse = {success:true , movie : movie};
    this.deleteEmitter.emit(serverResponse);
  }

  checkExistingTitle(movie:any){ // check server for movie title 
    let valid = false;
    for(let i = 0 ; i < this.moviesArray.length ; i++){
      if(this.moviesArray[i].Title.toLowerCase() === movie.Title.toLowerCase()){
        if(this.moviesArray[i].imdbID !== movie.imdbID){ // allow edit same movie without changing title 
          valid = false;
          return valid;
        }else{  
          valid = true;
        }
      }else{ 
       valid = true;
      }
    }
    return valid;
  }

}
