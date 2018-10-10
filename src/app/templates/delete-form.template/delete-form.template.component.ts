import { Component, OnInit, Inject } from '@angular/core';
import { MoviesService } from '../../shared/services/movies.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'delete-form-template',
  templateUrl: './delete-form.template.component.html',
  styleUrls: ['./delete-form.template.component.css']
})
export class DeleteFormTemplateComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data:any,
                                        private dialog:MatDialog , 
                                        private movieService:MoviesService) { }

  ngOnInit() {
  }

  deleteMovie(){
    this.movieService.deleteMovie(this.data.movie);
    this.close();
  }

  close(){
    this.dialog.closeAll()  
  }

}
