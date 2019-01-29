import { NgModule, ModuleWithProviders } from '@angular/core';
import { EscapeHtmlPipe } from './keep-html.pipe';

@NgModule({
  declarations: [EscapeHtmlPipe],
  exports: [EscapeHtmlPipe],
})
export class TDXAgilePipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TDXAgilePipesModule,
      providers: [],
    };
  }
}
