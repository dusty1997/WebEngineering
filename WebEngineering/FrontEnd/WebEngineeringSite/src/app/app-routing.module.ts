import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ActorsPageComponent } from './actors-page/actors-page.component';
import { ArtistStatsPageComponent } from './artiststats-page/artiststats-page.component';
import { MyBarChartComponent } from './artiststats-page/bar-chart.component';
import { GenresPageComponent } from './genres-page/genres-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MoviesPageComponent } from './movies-page/movies-page.component';
import { PopularPageComponent } from './popular-page/popular-page.component';

const routes: Routes = [
  {path: '',component: HomePageComponent},
  {path: 'actors',component: ActorsPageComponent},
  {path: 'movies', component: MoviesPageComponent},
  {path: 'popular', component: PopularPageComponent},
  {path: 'genres', component : GenresPageComponent },
  //The Artitstats page links to a Bar Chart route, so I add it as a child
  {path: 'artiststats', component : ArtistStatsPageComponent,
    children: [
    {
      path: 'bar-chart', 
      component: MyBarChartComponent
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
