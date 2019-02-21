import { Directive, ElementRef, HostListener, Input, Renderer2, OnDestroy } from '@angular/core';

/**
 * For accessibility
 * Creates an id for the aria-describedby attribute
 */
let nextId = 0;

/**
 * Directive to display tooltips
 *
 * @export
 * @implements OnDestroy
 */
@Directive({
  selector: '[tdTooltip]',
})
export class TdTooltipDirective implements OnDestroy {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  tooltip: any;
  private elemPosition: any;
  private hideTimeoutId: number;
  private showTimeoutId: number;
  private tooltipId = `td-tooltip-${nextId++}`;

  @Input('tdTooltip') tooltipText = '';
  @Input() placement = 'top';
  @Input() delay = 0;
  @Input() showDelay = 300;
  @Input() hideDelay = 300;
  @Input() zIndex = 1030;
  @Input() tooltipOffsetY: any = 0;
  @Input() tooltipOffsetX: any = 0;

  @HostListener('focusin')
  @HostListener('mouseenter')
  @HostListener('mousemove')
  onMouseEnter() {
    this.getElemPosition();

    if (!this.tooltip && this.tooltipText !== undefined) {
      this.create();
      this.setPosition();
      this.show();
    }
  }

  @HostListener('focusout')
  @HostListener('mouseleave')
  @HostListener('mousedown')
  onMouseLeave() {
    this.hide();
  }

  ngOnDestroy(): void {
    if (this.tooltip) {
      this.hide();
    }
  }

  /**
   * Gets the bounding of the tooltip element
   */
  getElemPosition(): void {
    this.elemPosition = this.element.nativeElement.getBoundingClientRect();
  }

  /**
   * Creates the span that hosts the popover and appends it to the document body
   */
  create(): void {
    this.showDelay = this.delay || this.showDelay;

    // Creating element and adding classes
    this.tooltip = this.renderer.createElement('span');
    const text = this.renderer.createText(this.tooltipText);
    this.renderer.appendChild(this.tooltip, text);
    this.renderer.addClass(this.tooltip, 'tdNg-tooltip');
    const placementClass: string = 'tdNg-tooltip-' + this.placement;
    this.renderer.addClass(this.tooltip, placementClass);

    // Accessibility
    this.renderer.setAttribute(this.tooltip, 'aria-describedby', this.tooltipId);

    // Checking for z-index
    if (this.zIndex) {
      this.renderer.setStyle(this.tooltip, 'z-index', this.zIndex);
    }

    // Appending to body for now
    this.renderer.appendChild(document.body, this.tooltip);
  }

  /**
   * Adds the class tdNg-tool-show which creates the fade in effect
   * Tooltip fade is configurable in the HTML
   */
  show(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }

    this.showDelay = this.delay || this.showDelay;

    this.showTimeoutId = window.setTimeout(() => {
      if (this.tooltip) {
        this.renderer.addClass(this.tooltip, 'tdNg-tooltip-show');
      }
    }, this.showDelay);
  }

  /**
   * Removes the tooltip span from the document
   */
  hide(): void {
    clearTimeout(this.showTimeoutId);

    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
    }

    if (this.tooltip) {
      this.renderer.removeClass(this.tooltip, 'tdNg-tooltip-show');
      this.renderer.removeAttribute(this.tooltip, 'aria-describedby');
      this.hideTimeoutId = window.setTimeout(() => {
        this.renderer.removeChild(document.body, this.tooltip);
        // this.tooltip.parentNode.removeChild(this.tooltip);
        this.tooltip = null;
      }, this.hideDelay);
    }
  }

  /**
   * Sets the positioning of the tooltip
   * Lots of math
   */
  setPosition(): void {
    const elemHeight: number = this.element.nativeElement.offsetHeight;
    const elemWidth: number = this.element.nativeElement.offsetWidth;
    const tooltipHeight: number = this.tooltip.clientHeight;
    const tooltipWidth: number = this.tooltip.offsetWidth;
    const scrollY: number = window.pageYOffset;
    // This is an offset that is put in to counteract the padding of the tooltip
    const paddingOffset = 8;

    // Allowing an offset via input
    const offsetX = parseInt(this.tooltipOffsetX, 10);
    const offsetY = parseInt(this.tooltipOffsetY, 10);

    // The margin on our fa is annoying me
    let marginOffset = 0;
    const childrenToElement: any[] = this.element.nativeElement.children;

    // Does the element have children
    if (childrenToElement.length > 0) {
      // Here we are assuming that the first child is the span element with the fa on it
      if (childrenToElement[0].classList.length > 0) {
        const childClassList = childrenToElement[0].classList;

        // For loop will always be faster
        for (let i = 0; i < childClassList.length; i++) {
          if (childClassList[i] === 'fa') {
            marginOffset = 5;
            break;
          }
        }
      }
    }

    if (this.placement === 'top') {
      const amount: number = this.elemPosition.top + scrollY - (tooltipHeight + paddingOffset) - offsetY;
      this.renderer.setStyle(this.tooltip, 'top', amount + 'px');
    }

    if (this.placement === 'bottom') {
      const amount: number = this.elemPosition.top + scrollY + elemHeight + paddingOffset + offsetY;
      this.renderer.setStyle(this.tooltip, 'top', amount + 'px');
    }

    if (this.placement === 'top' || this.placement === 'bottom') {
      const amount: number = this.elemPosition.left + elemWidth / 2 - tooltipWidth / 2 - marginOffset + offsetX;
      this.renderer.setStyle(this.tooltip, 'left', amount + 'px');
    }

    if (this.placement === 'left') {
      const amount: number = this.elemPosition.left - tooltipWidth - paddingOffset + offsetX;
      this.renderer.setStyle(this.tooltip, 'left', amount + 'px');
    }

    if (this.placement === 'right') {
      const amount: number = this.elemPosition.left + elemWidth + paddingOffset + offsetX;
      this.renderer.setStyle(this.tooltip, 'left', amount + 'px');
    }

    if (this.placement === 'left' || this.placement === 'right') {
      const amount: number = this.elemPosition.top + scrollY + elemHeight / 2 - this.tooltip.clientHeight / 2 + offsetY;
      this.renderer.setStyle(this.tooltip, 'top', amount + 'px');
    }
  }
}
