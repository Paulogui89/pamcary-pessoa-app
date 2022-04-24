import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Pessoa } from './pessoa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {
  private pessoaApiServerURL = environment.pessoaApiServerURL;

  constructor(private http: HttpClient) {  }

  public PessoaAPIFindAll(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.pessoaApiServerURL}`);
  }

  public PessoaAPICreate(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.pessoaApiServerURL}`, pessoa);
  }

  public PessoaAPIRead(pessoaID: number): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaApiServerURL}/${pessoaID}`);
  }

  public PessoaAPIUpdate(pessoa: Pessoa): Observable<Pessoa> {
    console.log("PessoaAPIUpdate pessoa: " + pessoa.gpspamcaryPessoa001ID + " - " + pessoa.gpspamcaryPessoa001NomeCompleto);
    return this.http.put<Pessoa>(`${this.pessoaApiServerURL}`, pessoa);
  }

  public PessoaAPIDelete(pessoaID: number): Observable<void> {
    return this.http.delete<void>(`${this.pessoaApiServerURL}/${pessoaID}`);
  }

  public PessoaAPIFindByCPF(pessoaCPF: string): Observable<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoaApiServerURL}/cpf/${pessoaCPF}`);
  }

}

