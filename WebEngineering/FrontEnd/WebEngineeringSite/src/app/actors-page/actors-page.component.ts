import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.css']
})
export class ActorsPageComponent implements OnInit {
  itemsPerPage = 20;
  page = 0;
  name = "";
  actors;


  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
    this.showActors();
  }

  showActors() {
    
    this.api.getActors(this.name,this.itemsPerPage,this.page).subscribe(data => {
      console.log(data);
      this.actors = data;
    })
  }

  /*getActors(){
    
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8').set('page',this.page + '').set('itemsPerPage',this.itemsPerPage + '').set('actors',this.name);
    console.log(this.name, this.itemsPerPage)
    return this.http.get(this.url,{'headers': header});
  }*/

}
