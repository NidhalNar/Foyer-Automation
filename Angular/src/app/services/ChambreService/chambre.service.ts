import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Chambre } from 'src/app/models/Chambre';
import { Observable } from 'rxjs';
import { Evaluation } from 'src/app/models/Evaluation';

@Injectable({
  providedIn: 'root'
})
export class ChambreService {
  private apiUrl = 'http://192.168.43.129:8084/foyer/chambre';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  

  constructor(private http: HttpClient) {}


  getAllChambres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  
  
    //return this.http.get<Chambre[]>(`${this.apiUrl}/retrieve-all-chambre`);
  
  getChambreById(idChambre: number): Observable<Chambre> {
    return this.http.get<Chambre>(`${this.apiUrl}/retrieve-chambre/${idChambre}`);
  }
/*
  addChambre(chambre: Chambre): Observable<Chambre> {
    return this.http.post<Chambre>(`${this.apiUrl}/add-chambre`, chambre);
  }
  
  */
/*
  addChambre(chambreData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-chambre`, chambreData);
  }
  */

  addChambre(chambreData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ajouter`, chambreData);
  }

  updateChambre(chambre: Chambre): Observable<Chambre> {

    return this.http.put<Chambre>(`${this.apiUrl}/update-chambre`, chambre);
  }


  deleteChambre(idChambre: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/supprimer/${idChambre}`);
      
  }

  getChambresParNomBloc(nomBloc: string): Observable<Chambre[]> {
    return this.http.get<Chambre[]>(`${this.apiUrl}/chambres/${nomBloc}`);
  }

  countChambresByTypeAndBloc(idBloc: number, type: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/bloc/${idBloc}/chambres/count?type=${type}`);
  }



  getPDF(idBloc: number): Observable<Blob> {
    const url = `${this.apiUrl}/generatePdf/${idBloc}`;
    return this.http.get(url, { responseType: 'blob' });
  }
  

  getStatistiqueBlocs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/statistiques`);
  }
  
  getEvaluations(chambreId: number): Observable<Evaluation[]> {
    const url = `${this.apiUrl}/chambres/${chambreId}/evaluations`;
    return this.http.get<Evaluation[]>(url);
  }

  ajouterEvaluation(idChambre: number, evaluation: Evaluation): Observable<Chambre> {
    const url = `${this.apiUrl}/${idChambre}/evaluations`;
    return this.http.post<Chambre>(url, evaluation);
  }

  getWellRatedEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/well-rated`);
  }

  getNotWellRatedEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(`${this.apiUrl}/not-well-rated`);
  }

  
  getEvaluationByChambreId(idChambre: number): Observable<Evaluation> {
    const url = `${this.apiUrl}/${idChambre}`;
    return this.http.get<Evaluation>(url);
  }
  

  getChambreDetails(idChambre: number, dateDebut: string, dateFin: string): Observable<any> {
    const url = `${this.apiUrl}/${idChambre}/Chambres`;

    // Utilize HttpParams to add parameters to the request
    const params = new HttpParams()
      .set('dateDebut', dateDebut)
      .set('dateFin', dateFin);

    // Include your HTTP options
    return this.http.get(url, { params, ...this.httpOptions });
  }
}
