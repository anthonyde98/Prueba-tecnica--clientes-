import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icliente } from '../interfaces/icliente';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  APIUrl = environment.APIUrl;
  recurso = "customer";

  constructor(private http: HttpClient) { }

  getCustomers(query: any): Observable<any>{
    return this.http.get(this.APIUrl + this.recurso, {
      params: query,
      observe: 'response'
    })
  }

  getCustomer(id: string): Observable<any>{
    return this.http.get(this.APIUrl + this.recurso + "/" + id, {observe: 'response'})
  }

  addCustomer(cliente: Icliente): Observable<any>{
    return this.http.post(this.APIUrl + this.recurso, cliente, {observe: 'response'})
  }

  updateCustomer(id: string, cliente: Icliente): Observable<any>{
    return this.http.patch(this.APIUrl + this.recurso + "/" + id, cliente, {observe: 'response'})
  }

  deleteCustomer(id: string): Observable<any>{
    return this.http.delete(this.APIUrl + this.recurso + "/" + id, {observe: 'response'})
  }
}
