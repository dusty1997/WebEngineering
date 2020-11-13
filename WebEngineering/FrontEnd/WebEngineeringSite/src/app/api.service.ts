import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "http://localhost:3000/database/" //environment.apiUrl;

@Injectable(
{
  providedIn : 'root',
}
)
export class ApiService {

  constructor(private http: HttpClient) {

   }
   //Get A specific actor
    public getActors(name : string, itemsPerPage : number, page : number){
      let header = new HttpHeaders();
      header = header.set('Content-Type', 'application/json; charset=utf-8').set('page',page + '').set('itemsperpage',itemsPerPage + '').set('actors',name);
      console.log(name, itemsPerPage)
      return this.http.get(API_URL + 'actors',{'headers': header});//.catch(this.handleError);
   }
   /* Get a Specific Movie
   HTTP Headers: title,page,itemsperpage, imdb, actor, director, year */
   public getMovies(title : string, page : number, itemsPerPage : number, imdb : string, actor : string, director : string, year : number){
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8').set('title', title).set('page',page + '').set('itemsperpage',itemsPerPage + '').set('actor',actor).set('imdb', imdb).set('director',director).set('year',year + '');
    console.log(arguments); //Dynamically print all arguments of the function for debug purposes
    return this.http.get(API_URL + 'movies',{'headers': header});//.catch(this.handleError);
   }
   /* Get Popular Movies
   HTTP Headers: year, page, itemsperpage */
   public getPopular(year: number, itemsPerPage : number, page : number){
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8').set('page',page + '').set('itemsperpage',itemsPerPage + '').set('year',year + '');
    console.log(arguments)
    return this.http.get(API_URL + 'popular',{'headers': header});//.catch(this.handleError);
   }
   /* Get Artist Statistics
   HTTP Headers: year, artist*/
   public getArtistStats(year : number, artist : string){
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8').set('year',year + '').set('artist',artist);
    console.log(arguments);
    return this.http.get(API_URL + 'artiststats',{'headers': header});//.catch(this.handleError);
   }
   /* Get Genres 
   HTTP Headers: page, itemsperpage,actor,director,year*/
   public getGenres(page : number, itemsPerPage : number, actor : string, director : string, year : number){
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8').set('year',year + '').set('page',page + '').set('actor', actor).set('director',director).set('itemsperpage', itemsPerPage + '');
    console.log(arguments);
    return this.http.get(API_URL + 'genres',{'headers': header});//.catch(this.handleError);
   }
   /* API Handle Error Function*/
   private handleError (error : Response | any){
     console.log("HOLY SHIT WE GOT AN ERROR");
     console.error('ApiService::handleError', error);
     return Observable.throw(error);
   }
}
