import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ActorsPageComponent } from './actors-page/actors-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { PopularPageComponent } from './popular-page/popular-page.component';
import { ArtistStatsPageComponent } from './artiststats-page/artiststats-page.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { MyBarChartComponent } from './artiststats-page/bar-chart.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ActorsPageComponent,
    MoviesPageComponent,
    PopularPageComponent,
    GenresPageComponent,
    MyBarChartComponent,
    ArtistStatsPageComponent,
    HomePageComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ChartsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  providers: [MyBarChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
