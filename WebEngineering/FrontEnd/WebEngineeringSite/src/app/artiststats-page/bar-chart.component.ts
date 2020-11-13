 import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {
  constructor() { }
  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartReady = false;
  public labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8','9','10'];
  public chartType = 'bar';
  public chartLegend = true;
  public chartData = [ {data : [], label: 'Actor Score Values'}];
  ngOnInit() {
  }
  public setBarChart(dat : Array<number>){
    this.chartData = [{data: dat, label: 'Actor Score Values'}];
    this.chartReady = true;
    return this.chartData;
  }
} 