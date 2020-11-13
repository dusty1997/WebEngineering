import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.css']
})
export class GenresPageComponent implements OnInit {
  itemsPerPage = 20;
  page = 1;
  director = "";
  actor = "";
  year = 2020;
  genres;


  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.showGenres();
  }

  showGenres() {
    
    this.api.getGenres(this.page , this.itemsPerPage , this.actor , this.director , this.year ).subscribe(data => {
      console.log(data);
      this.genres = data;
    })
  }
}