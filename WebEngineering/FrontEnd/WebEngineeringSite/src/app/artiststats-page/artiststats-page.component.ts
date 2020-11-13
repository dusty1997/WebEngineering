import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Chart } from "chart.js";
import { MyBarChartComponent } from './bar-chart.component';
@Component({
  selector: 'app-artiststats-page',
  templateUrl: './artiststats-page.component.html',
  styleUrls: ['./artiststats-page.component.css']
})
export class ArtistStatsPageComponent implements OnInit {
  stats;
  artist = "";
  year = 2020;
  maxScore;
  ratings;
  barChart;
  topMovie;
  chart;
  constructor(private http: HttpClient, private api: ApiService, private charter : MyBarChartComponent) { }

  ngOnInit(): void {
    if(!this.stats.mean == undefined){
    this.showArtistStats();
    } else {
       this.stats.mean = -69;
    }
    //this.ratings = this.stats.ratingsArray;
  //  console.log("RATINGS: " + this.ratings);
  }

  showArtistStats() {
    
    this.api.getArtistStats(this.year, this.artist).subscribe(data => {
      console.log(data);
      this.stats = data;
      this.barChart = [{data : this.stats[0].ratingArray, label: 'Actor Score Values'}];
      this.maxScore = Math.max(...this.stats[0].ratingArray);
      this.chart = new Chart("canvas", {
        type: 'bar',
        data: {
          labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8','9','10'],
          datasets: [{
            label: 'Actor Score Values',
            data : this.stats[0].ratingArray,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
          }]
        },
        options : {
          scales : {
          yAxes: [{
              ticks: {
                  min: 0,
                  max: this.maxScore, //Dynamic Charting, this way the chart is proportional to the actors max number of movies
                  stepSize: 1
              }
          }]
      }
    }
      })
    })
  }
  /* Bar Chart Data*/
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartReady = false;
  public labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8','9','10'];
  public chartType = 'bar';
  public chartLegend = true;

  showBarChart(dat : Array<number>){
    console.log(dat);
  }
}