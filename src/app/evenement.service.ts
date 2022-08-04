import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private baseUrl = 'http://localhost:8081/SpringMVC/evenement';

  constructor(private http: HttpClient) { }
 

  createEvenement(formData: FormData): Observable<any> {

    return this.http.post(`${this.baseUrl}/add-evenement`, formData);
  } 
  getEvenementList(idp:any):Observable<any> {
    return this.http.get(this.baseUrl+'/get-evenement/'+idp);
  }

  updateEvenement( value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/modify-evenement/`, value);
  }

  getEvenement(idevenement: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/retrieve-evenement/${idevenement}`);
  }

  deleteEvenement(idevenement: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/remove-evenement/${idevenement}`, { responseType: 'text' });
  }

  participeEvenement(parent: any, event: any){
    console.log('fff',event);
    console.log('ttt',parent);
    
    
    return this.http.post(this.baseUrl+'/participate/'+parent+'/'+event, { responseType: 'text' });
  }
 
}
