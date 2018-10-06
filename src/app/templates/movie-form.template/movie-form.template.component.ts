import { Component, OnInit ,Inject , Input, Output , EventEmitter  } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import {MoviesService} from '../../shared/services/movies.service';
import { MAT_DIALOG_DATA, MatDialog} from '@angular/material';
@Component({
  selector: 'movie-form.template',
  templateUrl: './movie-form.template.component.html',
  styleUrls: ['./movie-form.template.component.css']
})
export class MovieFormTemplateComponent implements OnInit {
  myForm:FormGroup;
  errorObj:any = {
    Title:"",
    Year:"",
    Runtime:"",
    Genre:"",
    Director:""
  };
  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
                                        private dialog:MatDialog,
                                        private movieService: MoviesService,
                                        private fb: FormBuilder  ) {
    this.myForm = fb.group({
      Title:[null ,Validators.required],
      Year:[null, Validators.compose([
        Validators.required , 
        Validators.minLength(4) ,
        Validators.maxLength(4),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/), 
        Validators.min(1900),
        Validators.max(Number(new Date().getFullYear())) // user can upload or update year only numbers and only from 1900 untill the current year 
      ])], 
      Runtime:[null , Validators.compose([Validators.required])],
      Genre:[null , Validators.compose([Validators.required])],
      Director:[null , Validators.compose([Validators.required])],
      Plot:[{value: null , disabled: true }]
    })  
  }

  ngOnInit() {
    this.setFormValues();
  }

  setFormValues(){
    this.myForm.get("Title").setValue(this.data.movie.Title);
    this.myForm.get("Director").setValue(this.data.movie.Director);
    this.myForm.get("Genre").setValue(this.data.movie.Genre);
    this.myForm.get("Year").setValue(this.data.movie.Year);
    this.myForm.get("Runtime").setValue(this.data.movie.Runtime);
    this.myForm.get("Plot").setValue(this.data.movie.Plot);
  }

  validateForm(){
    if( (this.myForm.get("Title").valid && this.myForm.value.Title !== "" || null) && 
        (this.myForm.get("Director").valid && this.myForm.value.Director !== "" || null) && 
        (this.myForm.get("Genre").valid && this.myForm.value.Genre !== "" || null) &&
        (this.myForm.get("Year").valid && this.myForm.value.Year !== "" || null) &&
        (this.myForm.get("Runtime").valid && this.myForm.value.Runtime !== "" || null) ){
        if(this.checkExistingTitle()){
            switch(this.data.title){
              case "Add":
                this.movieService.addMovie(this.myForm.value);
                break;
              case "Edit":
                this.movieService.editMovie(this.myForm.value , this.data.movie.imdbID);
                break;
              default: return; 
            }
        }else{
           // diferent from error msg because it supposed to check in DB
          this.promptErrorMsg()
          this.errorObj.Title = "Title Already Exists";
        }
    }else{
      this.promptErrorMsg()
    }    
  }

  checkExistingTitle(){
    let movie = {
      Title : this.myForm.value.Title,
      imdbID : this.data.movie.imdbID || ""
    } 
    return this.movieService.checkExistingTitle(movie);
  }

  promptErrorMsg(){
    this.errorObj.Title = this.myForm.get("Title").valid ? "" : "Title is requierd";
    this.errorObj.Director = this.myForm.get("Director").valid ? "" : "Director is requierd";
    this.errorObj.Genre = this.myForm.get("Genre").valid ? "" : "Genre is requierd";
    this.errorObj.Year = this.myForm.get("Year").valid ? "" : "Year is requierd and must be valid and with 4 numbers begining from 1900 untill today";
    this.errorObj.Runtime = this.myForm.get("Runtime").valid ? "" : "Runtime is requierd"; 
  }

  close(){
    this.dialog.closeAll();
  }

}
