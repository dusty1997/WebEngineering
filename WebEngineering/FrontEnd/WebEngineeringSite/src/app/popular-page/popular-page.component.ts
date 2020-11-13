import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-popular-page',
  templateUrl: './popular-page.component.html',
  styleUrls: ['./popular-page.component.css']
})
export class PopularPageComponent implements OnInit {
  itemsPerPage = 20;
  page = 0;
  title = "";
  movies;
  actor = "";
  year = 2020;


  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.showPopular();
  }

  showPopular() {
    
    this.api.getPopular(this.year, this.itemsPerPage, this.page).subscribe(data => {
      console.log(data);
      this.movies = data;
    })
  }
}