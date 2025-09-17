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
    const originalText = this.el.nativeElement.innerText;
    const text = originalText.toLowerCase();

    if (this.keywords.length > 0) {
      this.keywords.forEach((keyword) => {
        const lowerKeyword = keyword.toLowerCase();

        const highlightedText = text.replaceAll(
          lowerKeyword,
          `<span style="background-color: yellow">${lowerKeyword}</span>`
        );
        console.log(highlightedText);

        this.el.nativeElement.innerHTML = highlightedText;
      });
    } else {
      this.el.nativeElement.innerHTML = this.el.nativeElement.innerText;
    }
  }
}
