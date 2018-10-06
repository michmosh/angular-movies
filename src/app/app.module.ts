import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule ,ReactiveFormsModule }   from '@angular/forms';
// MATERIAL MODULE
    // added angular material module for the dialog to show use of angular material components 
import {MaterialModule} from './shared/material/app.material'; 
// COMPONENTS
import { AppComponent } from './app.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

//SERVICES
import {MoviesService} from './shared/services/movies.service';
import { TitlePipe } from './shared/pipes/title.pipe';
import { MovieFormTemplateComponent } from './templates/movie-form.template/movie-form.template.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { DeleteFormTemplateComponent } from './templates/delete-form.template/delete-form.template.component';
@NgModule({
  declarations: [
    AppComponent,
    MoviesListComponent,
    TitlePipe,
    MovieFormTemplateComponent,
    AddMovieComponent,
    DeleteFormTemplateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [MoviesService],
  bootstrap: [AppComponent],
  entryComponents:[MovieFormTemplateComponent,DeleteFormTemplateComponent]
})
export class AppModule { }
