/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private _storage: Storage,
    private toastController: ToastController
  ) {
    this.init();
    this.cargarFavorito();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  async init() {
    const storage = await this._storage.create();
    this._storage = storage;
  }

  public guardarPelicula(pelicula: PeliculaDetalle) {
    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculas) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter((peli) => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast(mensaje);
    this._storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavorito() {
    const peliculas = await this._storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavorito();
    const existe = this.peliculas.find((peli) => peli.id === id);

    return existe ? true : false;
  }
}
