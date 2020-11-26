import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaixaeletronicoComponent } from './components/caixaeletronico/caixaeletronico.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TransacaoComponent } from './components/transacao/transacao.component';

export const routes: Routes = [
  { path: 'cliente', component: ClienteComponent},
  { path: 'caixaeletronico', component: CaixaeletronicoComponent},
  { path: 'transacao', component: TransacaoComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: '', redirectTo: 'transacao', pathMatch: 'full'},
  { path: '**', redirectTo: 'transacao', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
