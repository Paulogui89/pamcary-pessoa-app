import { Component, OnInit } from '@angular/core';
import { Pessoa } from './pessoa';
import { PessoaService } from './pessoa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gps-pamcary-pessoa-app';
  pessoas!: Pessoa[];
  pessoaEditada!: Pessoa;
  pessoaDeletada!: Pessoa;

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
        this.pessoas = [];
        alert("status: " + error.status + " - " + error.error.message);
      }
    );
  }

  public clickModalAdicionarPessoa(addForm: NgForm): void {
    document.getElementById('adicionar-pessoa-form')?.click();
    this.pessoaService.PessoaAPICreate(addForm.value).subscribe(
      (response: Pessoa) => {
        console.log(response);
        this.pessoaAPIFindAll();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert("status: " + error.status + " - " + error.error.message);
        addForm.reset();
      }
    );
  }

  public clickModalEditarPessoa(pessoaModalEditada: Pessoa): void {
    pessoaModalEditada.gpspamcaryPessoa001ID = this.pessoaEditada.gpspamcaryPessoa001ID;
    this.pessoaService.PessoaAPIUpdate(pessoaModalEditada).subscribe(
      (response: Pessoa) => {
        console.log(response);
        this.pessoaAPIFindAll();
      },
      (error: HttpErrorResponse) => {
        alert("status: " + error.status + " - " + error.error.message);
      }
    );
  }

  public clickModalDeletarPessoa(PessoaId: number): void {
    this.pessoaService.PessoaAPIDelete(PessoaId).subscribe(
      (response: void) => {
        console.log(response);
        this.pessoaAPIFindAll();
      },
      (error: HttpErrorResponse) => {
        alert("status: " + error.status + " - " + error.error.message);
      }
    );
  }

  public onOpenModal(modalpessoa: Pessoa| null, mode: string): void {
    console.log("onOpenModal - mode: " + mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'adicionar') {
      button.setAttribute('data-target', '#adicionarPessoaModal');
    }
    if (mode === 'editar') {
      this.pessoaEditada = modalpessoa!;
      button.setAttribute('data-target', '#editarPessoaModal');
    }
    if (mode === 'deletar') {
      this.pessoaDeletada = modalpessoa!;
      button.setAttribute('data-target', '#deletarPessoaModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public findByID(key: number): void {
    console.log(key);
    this.pessoaService.PessoaAPIRead(key).subscribe(
      (response: Pessoa) => {
        console.log(response);
        this.pessoas = [];
        this.pessoas.push(response);
      },
      (error: HttpErrorResponse) => {
        alert("status: " + error.status + " - " + error.error.message);
      }
    )
  }

  public findByCPF(key: string): void {
    console.log(key);
    this.pessoaService.PessoaAPIFindByCPF(key).subscribe(
      (response: Pessoa) => {
        console.log(response);
        this.pessoas = [];
        this.pessoas.push(response);
      },
      (error: HttpErrorResponse) => {
        alert("status: " + error.status + " - " + error.error.message);
      }
    )
  }
  
}
