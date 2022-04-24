import { Component, OnInit } from '@angular/core';
import { Pessoa } from './pessoa';
import { PessoaService } from './pessoa.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pamcary-pessoa-app';
  pessoas!: Pessoa[];

  constructor(private pessoaService: PessoaService){}

  ngOnInit(): void {
    this.pessoaAPIFindAll();
  }

  public pessoaAPIFindAll(): void {
    this.pessoaService.PessoaAPIFindAll().subscribe(
      (listaPessoas: Pessoa[]) => {
        this.pessoas = listaPessoas;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
