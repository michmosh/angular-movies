import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../shared/services/movies.service' ; 
import {Movie} from '../shared/model/movie.model';
import {MatDialog, MatDialogRef } from '@angular/material';
import {MovieFormTemplateComponent} from '../templates/movie-form.template/movie-form.template.component' ; 
import { DeleteFormTemplateComponent } from '../templates/delete-form.template/delete-form.template.component';
import { Store} from '@ngrx/store';
import * as MovieActions from '../store/actions';
import { Observable } from 'rxjs/Observable';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies:Observable<Movie> ;
  selectedMovie : Movie ; 
  matModalRef : MatDialogRef<MovieFormTemplateComponent>;
  deleteModalRef : MatDialogRef<DeleteFormTemplateComponent>
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  constructor(private movieService : MoviesService,
              private dialog: MatDialog ,
              private breakpointObserver: BreakpointObserver , 
              private store:Store<any>) { }

  ngOnInit():void {
    this.store.select('movie').subscribe((movies)=>{
      this.movies = movies;
    })

    this.getMovies();
    this.movieService.movieEmitter.subscribe(res=>{
      if(res.action === "add" ) return  this.addMovieToList(res.movie);
      if(res.action === "edit" ) return this.editMovieToList(res.movie)
    });
  }

  getMovies():void{
    this.movieService.getMovies().subscribe(res=>{
      this.store.dispatch(new MovieActions.GetMovies(res.Search)); 
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
      this.store.dispatch(new MovieActions.RemoveMovie(this.movies[index]))
    })
  }

  addMovieToList(movie){
    this.store.dispatch(new MovieActions.AddMovie(movie));
    this.dialog.closeAll();
  }

  editMovieToList(movie){
   this.store.dispatch(new MovieActions.EditMovie(movie));
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
    
    // change size of material dialog on extra small devices
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => { 
      if (size.matches) {
        this.matModalRef.updateSize('80vw');
             } else {
              this.matModalRef.updateSize('50vw');
           }
         });
         this.matModalRef.afterClosed().subscribe(result => {
            smallDialogSubscription.unsubscribe();
        });
    
  }

}
