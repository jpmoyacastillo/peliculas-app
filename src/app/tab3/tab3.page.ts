import { Component } from '@angular/core';
import { Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  peliculas: any[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private moviesService: MoviesService
  ) {}

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavorito();
    this.generos = await this.moviesService.cargarGenero();

    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: any[]) {
    this.favoritoGenero = [];

    generos.forEach((genero) => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter((peli) =>
          peli.genres.find((genre) => genre.id === genero.id)
        ),
      });
    });

    console.log(this.favoritoGenero);

    // {
    //   genero: 'Acción',
    //   pelis: []
    // }
  }
}
