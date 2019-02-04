import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'td-expand-collapse-glyph',
  templateUrl: './expand-collapse-glyph.component.html',
  styleUrls: ['./expand-collapse-glyph.component.scss'],
})
export class ExpandCollapseGlyphComponent {
  @Input() isExpanded = false;
}
