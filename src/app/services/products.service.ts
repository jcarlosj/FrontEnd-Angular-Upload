import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  headers!: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders();
  }

  create( formData: FormData ) : Observable<any> {
    this.headers.append( 'Accept', 'application/json' );

    return this.http.post(
      `http://localhost:4001/api/products`, 
      formData,
      { headers: this.headers }
    )
    // .pipe(
    //   catchError( error => {
    //     console.error( `Error al enviar la solicitud `, error );
    //     return throwError( 'Ocurrio un error al enviar la solicitud' )
    //   })
    // )
  }
}
