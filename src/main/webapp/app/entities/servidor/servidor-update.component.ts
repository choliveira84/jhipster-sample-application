import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServidor, Servidor } from 'app/shared/model/servidor.model';
import { ServidorService } from './servidor.service';

@Component({
  selector: 'jhi-servidor-update',
  templateUrl: './servidor-update.component.html',
})
export class ServidorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required, Validators.maxLength(255)]],
  });

  constructor(protected servidorService: ServidorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ servidor }) => {
      this.updateForm(servidor);
    });
  }

  updateForm(servidor: IServidor): void {
    this.editForm.patchValue({
      id: servidor.id,
      nome: servidor.nome,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const servidor = this.createFromForm();
    if (servidor.id !== undefined) {
      this.subscribeToSaveResponse(this.servidorService.update(servidor));
    } else {
      this.subscribeToSaveResponse(this.servidorService.create(servidor));
    }
  }

  private createFromForm(): IServidor {
    return {
      ...new Servidor(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServidor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
