import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = [
    'Spiderman',
    'El Señor De Los Anillos',
    'Avengers',
    'La Vida Es Bella',
  ];

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController
  ) {}

  buscar(event) {
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    // console.log(valor);
    this.buscando = true;
    this.movieService.buscarPelicula(valor).subscribe((resp) => {
      console.log(resp);
      // eslint-disable-next-line @typescript-eslint/dot-notation
      this.peliculas = resp['results'];
      console.log(this.peliculas);
      this.buscando = false;
    });
  }

  async verDetalle(id: number) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id,
      },
    });
    modal.present();
  }
}
