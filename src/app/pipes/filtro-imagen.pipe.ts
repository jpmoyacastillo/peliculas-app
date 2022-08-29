import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroImagen',
})
export class FiltroImagenPipe implements PipeTransform {
  transform(peliculas): any[] {
    return peliculas.filter((peli) => peli.backdrop_path);
  }
}
