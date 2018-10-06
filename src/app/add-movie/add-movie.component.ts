import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef } from '@angular/material';
import {MovieFormTemplateComponent} from '../templates/movie-form.template/movie-form.template.component' ;
import {MoviesService} from '../shared/services/movies.service' ; 
import {Movie} from '../shared/model/movie.model';
@Component({
  selector: 'add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  matModalRef : MatDialogRef<MovieFormTemplateComponent>;
  constructor(private movieService : MoviesService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  openAddDialog(){
    this.matModalRef = this.dialog.open(MovieFormTemplateComponent , {
      width:'50vw',
      data:{
        title:"Add",
        movie:Object.assign(new Movie(),{Title:"",Year:"",Runtime:"" ,Genre:"" ,Director:"" , Plot:""})
      }
    })
  }

}
