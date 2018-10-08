import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef } from '@angular/material';
import {MovieFormTemplateComponent} from '../templates/movie-form.template/movie-form.template.component' ;
import {MoviesService} from '../shared/services/movies.service' ; 
import {Movie} from '../shared/model/movie.model';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  matModalRef : MatDialogRef<MovieFormTemplateComponent>;
  isExtraSmall: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.XSmall);
  constructor(private movieService : MoviesService,
              private dialog: MatDialog , 
              private breakpointObserver : BreakpointObserver) { }

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

    // change size of material dialog on extra small devices
    const smallDialogSubscription = this.isExtraSmall.subscribe(size => { 
      if (size.matches) {
        this.matModalRef.updateSize('80vw');
      } 
      else {
        this.matModalRef.updateSize('50vw');
      }
    });
     
    this.matModalRef.afterClosed().subscribe(result => {
      smallDialogSubscription.unsubscribe();
    });
  }

}
