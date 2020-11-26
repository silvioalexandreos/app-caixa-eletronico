import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transacao } from '../models/Transacao';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  baseURL = `${environment.mainUrlAPI}transacao`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.baseURL);
  }

  getById(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.baseURL}/${id}`);
  }

  getByClienteId(id: number): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.baseURL}/ByCliente/${id}`);
  }

  post(transacao: Transacao) {
    return this.http.post(this.baseURL, transacao);
  }

  put(transacao: Transacao) {
    return this.http.put(`${this.baseURL}/${transacao.id}`, Transacao);
  }

  delete(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
