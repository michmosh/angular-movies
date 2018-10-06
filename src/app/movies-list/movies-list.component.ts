import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../shared/services/movies.service' ; 
import {Movie} from '../shared/model/movie.model';
import {MatDialog, MatDialogRef } from '@angular/material';
import {MovieFormTemplateComponent} from '../templates/movie-form.template/movie-form.template.component' ; 
import { DeleteFormTemplateComponent } from '../templates/delete-form.template/delete-form.template.component';
@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies:Array<Movie> = [];
  selectedMovie : Movie ; 
  matModalRef : MatDialogRef<MovieFormTemplateComponent>;
  deleteModalRef : MatDialogRef<DeleteFormTemplateComponent>
  constructor(private movieService : MoviesService,
              private dialog: MatDialog) { }

  ngOnInit():void {
    this.getMovies();
    this.movieService.movieEmitter.subscribe(res=>{
      if(res.action === "add" ) return  this.addMovieToList(res.movie);
      if(res.action === "edit" ) return this.editMovieToList(res)
    });
  }

  getMovies():void{
    this.movieService.getMovies().subscribe(res=>{
      this.movies = res.Search; 
    })
  }

  editMovie(imdbID:string , index:number):void{
    this.movieService.getMovieById(imdbID ,index ).subscribe(res=>{
      this.selectedMovie = res;
      this.openEditDialog();
    })
  }

  deleteMovie(index){
    this.movieService.deleteEmitter.subscribe(res=>{
      this.movies.splice(index ,1 );
    })
  }

  addMovieToList(movie){
    this.movies.push(movie);
    this.dialog.closeAll();
  }

  editMovieToList(movie){
    Object.assign(this.movies[movie.index] ,movie.movie ) 
    this.dialog.closeAll();
  }

  openDeleteMovie(imdbID:string, index:number){
    this.deleteMovie(index);
    this.deleteModalRef = this.dialog.open(DeleteFormTemplateComponent , {
      hasBackdrop: true,
      width:'50vw',
      data:{
        title:"Delete",
        imdbID:imdbID,
        movieName:this.movies[index].Title
      }
    })
  }

  openEditDialog():void{
    this.matModalRef = this.dialog.open(MovieFormTemplateComponent ,{
      hasBackdrop: true,
      width:'50vw',
      data:{
        title:"Edit",
        movie:this.selectedMovie
      }
    })
  }

}
