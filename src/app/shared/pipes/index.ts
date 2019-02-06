import { NgModule, ModuleWithProviders } from '@angular/core';
import { EscapeHtmlPipe } from './keep-html.pipe';
import { TrimTextToLimitPipe } from './trim-text-to-limit.pipe';

@NgModule({
  declarations: [EscapeHtmlPipe, TrimTextToLimitPipe],
  exports: [EscapeHtmlPipe, TrimTextToLimitPipe],
})
export class TDXAgilePipesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TDXAgilePipesModule,
      providers: [],
    };
  }
}
