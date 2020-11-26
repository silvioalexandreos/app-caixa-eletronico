import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cliente } from 'src/app/models/Cliente';
import { Transacao } from 'src/app/models/Transacao';
import { ClienteService } from 'src/app/services/cliente.service';
import { TransacaoService } from 'src/app/services/transacao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit, OnDestroy {

  public modalRef: BsModalRef;
  public clienteForm: FormGroup;
  public titulo = 'Clientes';
  public clienteSelecionado: Cliente;
  public textSimple: string;
  public transClientes: Transacao[];
  public clientes: Cliente[];
  public cliente: Cliente;
  public msnDeleteCliente: string;
  public modeSave = 'post';

  private unsubscriber = new Subject();

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private transacaoService: TransacaoService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  transacaoCliente(template: TemplateRef<any>, id: number): void {
    this.spinner.show();
    this.transacaoService.getByClienteId(id)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((transacoes: Transacao[]) => {
        this.transClientes = transacoes;
        this.modalRef = this.modalService.show(template);
      }, (error: any) => {
        this.toastr.error(`erro: ${error}`);
        console.log(error);
      }, () => this.spinner.hide()
    );
  }

  criarForm(): void {
    this.clienteForm = this.fb.group({
      id: [0],
      dataCadastro: ['', Validators.required],
      status: ['', Validators.required],
      tipo: ['', Validators.required],
      conta: ['', Validators.required],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', Validators.required],
      saldo: ['', Validators.required]
    });
  }

  saveCliente(): void {
    if (this.clienteForm.valid) {
      this.spinner.show();

      if (this.modeSave === 'post') {
        this.cliente = {...this.clienteForm.value};
      } else {
        this.cliente = {id: this.clienteSelecionado.id, ...this.clienteForm.value};
      }

      this.clienteService[this.modeSave](this.cliente)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(
          () => {
            this.carregarClientes();
            this.toastr.success('Cliente salvo com sucesso!');
          }, (error: any) => {
            this.toastr.error(`Erro: Cliente não pode ser salvo!`);
            console.error(error);
          }, () => this.spinner.hide()
        );

    }
  }

  carregarClientes(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.spinner.show();
    this.clienteService.getAll()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((clientes: Cliente[]) => {
        this.clientes = clientes;

        if (id > 0) {
          this.clienteSelect(this.clientes.find(cliente => cliente.id === id));
        }

        this.toastr.success('Cliente foram carregado com Sucesso!');
      }, (error: any) => {
        this.toastr.error('Cliente não carregados!');
        console.log(error);
      }, () => this.spinner.hide()
    );
  }

  clienteSelect(cliente: Cliente): void {
    this.modeSave = 'put';
    this.clienteSelecionado = cliente;
    this.clienteForm.patchValue(cliente);
  }

  voltar(): void {
    this.clienteSelecionado = null;
  }

  openModal(template: TemplateRef<any>, clienteId: number): void {
    this.transacaoCliente(template, clienteId);
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
