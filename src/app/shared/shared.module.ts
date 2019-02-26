import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Libraries
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DirectiveModule } from './directives';
import { TDXAgilePipesModule } from './pipes';

// Components
import { ButtonComponent } from './components/button/button.component';
import { CardResourceIconsComponent } from './components/card-resource-icons/card-resource-icons.component';
import { ExpandCollapseGlyphComponent } from './components/expand-collapse-glyph/expand-collapse-glyph.component';
import { FilterToolbarComponent } from './components/filter-toolbar/filter-toolbar.component';
import { GripComponent } from './components/grip/grip.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProfileImageComponent } from './components/profile-image/profile-image.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StoryPointIndicatorComponent } from './components/story-point-indicator/story-point-indicator.component';
import { SubtasksIconComponent } from './components/subtasks-icon/subtasks-icon.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ExpandCollapseGlyphComponent,
    FilterToolbarComponent,
    LoadingSpinnerComponent,
    SpinnerComponent,
    StoryPointIndicatorComponent,
    GripComponent,
    SubtasksIconComponent,
    CardResourceIconsComponent,
    ProfileImageComponent,
  ],
  imports: [CommonModule, DirectiveModule, TDXAgilePipesModule.forRoot(), TooltipModule.forRoot()],
  exports: [
    DirectiveModule,
    TDXAgilePipesModule,
    ButtonComponent,
    CardResourceIconsComponent,
    ExpandCollapseGlyphComponent,
    FilterToolbarComponent,
    GripComponent,
    LoadingSpinnerComponent,
    ProfileImageComponent,
    SpinnerComponent,
    StoryPointIndicatorComponent,
    SubtasksIconComponent,
  ],
})
export class SharedModule {}
