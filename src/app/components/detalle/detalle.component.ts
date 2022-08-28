import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Cast, PeliculaDetalle } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };

  constructor(
    private movieService: MoviesService,
    private modalController: ModalController,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {
    // console.log('ID', this.id);
    this.movieService.getPeliculaDetalle(this.id).subscribe((resp) => {
      console.log(resp);
      this.pelicula = resp;
    });

    this.movieService.getActoresPelicula(this.id).subscribe((resp) => {
      console.log(resp);
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalController.dismiss();
  }

  favorito() {
    this.dataLocal.guardarPelicula(this.pelicula);
  }
}
