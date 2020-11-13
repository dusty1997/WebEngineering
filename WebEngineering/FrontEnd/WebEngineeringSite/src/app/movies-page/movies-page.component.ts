import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from '../api.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  displayedColumns: string[] = ['name','img'];
  dataSource: MatTableDataSource<any>;
  itemsPerPage = 20;
  page = 0;
  title = "";
  movies;
  director = "";
  actor = "";
  year = 2020;
  imdb = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.movies);
    this.showMovies();
  }

  ngAfterViewInit() {
    
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  showMovies() {
    
    this.api.getMovies(this.title, this.page, this.itemsPerPage, this.imdb , this.actor , this.director , this.year ).subscribe(data => {
      console.log(data);
      this.movies = data;
      this.dataSource.data = this.movies;
      
    })
  }


}