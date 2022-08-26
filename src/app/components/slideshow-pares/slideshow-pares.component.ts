import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.1,
    freeMode: true,
    spaceBetween: -10,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onClick() {
    // console.log('Cargar más');
    this.cargarMas.emit();
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
