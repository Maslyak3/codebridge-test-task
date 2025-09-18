import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input('keywords') keywords: string[] = [];

  constructor(private el: ElementRef<HTMLElement>) {}
  ngOnChanges(): void {
    const text = this.el.nativeElement.textContent || '';

    if (!this.keywords.length) {
      this.el.nativeElement.innerHTML = text;
      return;
    }
    const regex = new RegExp(`(${this.keywords.join('|')})`, 'gi');

    this.el.nativeElement.innerHTML = text.replace(
      regex,
      `<span style="background-color: yellow">$1</span>`
    );
  }
}
