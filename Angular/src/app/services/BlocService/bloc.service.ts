import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Bloc } from 'src/app/models/Bloc';


@Injectable({
  providedIn: 'root'
})
export class BlocService {
  private apiUrl = "http://192.168.43.129:8084/foyer/blocc";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  


  constructor(private http: HttpClient) { }
  getAllBlocs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/retrieve-all-bloc`);
  }


  addBloc(blocData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, blocData)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }
  
  private handleError(error: any): Observable<any> {
    let errorMessage = 'An error occurred while adding the bloc. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else if (error.status === 400) {
      // Handle specific HTTP status codes with custom messages
      errorMessage = 'Invalid data. Please check your input.';
    } else if (error.status === 404) {
      errorMessage = 'The requested resource was not found.';
    }
  
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  
  



  removeBloc(idBloc: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/remove-bloc/${idBloc}`);
}

removeFoyerFromBloc(idBloc: number, idFoyer: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/remove-foyer-from-bloc/${idBloc}/${idFoyer}`);
}
retrieveBloc(idBloc: number): Observable<Bloc> {
  return this.http.get<Bloc>(`${this.apiUrl}/retrieve-bloc/${idBloc}`);
}


getBlocById(id: number): Observable<Bloc> {
  const url = `${this.apiUrl}/retrieve-bloc/${id}`;
  return this.http.get<Bloc>(url);
}
  
updateBloc(bloc: Bloc): Observable<Bloc> {
  const url = `${this.apiUrl}/update-bloc`;
  return this.http.put<Bloc>(url, bloc);
}
}
