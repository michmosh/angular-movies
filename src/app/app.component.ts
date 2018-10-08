import { Component , OnInit } from '@angular/core';
import { Store,select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  movies:Observable<any>
  constructor(private store:Store<any>){}

  ngOnInit(){
    this.store.select('movie').subscribe(movies=>{
      this.movies = movies
    })
  }
}
