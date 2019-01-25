import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const appRoutes: Routes = [
  { path: 'backlog', loadChildren: './backlog/backlog.module#BacklogModule' },
  { path: 'cardwall/project/:projectId/board/:boardId', loadChildren: './cardwall/cardwall.module#CardwallModule' },
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
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
