import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always',
};

export const appRoutes: Routes = [
  { path: 'backlog', loadChildren: './backlog/backlog.module#BacklogModule' },
  {
    path: 'cardwall/project/:projectId/board/:boardId',
    loadChildren: './cardwall/cardwall.module#CardwallModule',
  },
  {
    path: '',
    redirectTo: '/backlog',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/backlog',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, routingConfiguration)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
