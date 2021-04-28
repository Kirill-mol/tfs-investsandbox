import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[inputPassword]' })
export class InputPasswordDirective {
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.code === 'Space') {
      event.preventDefault();
    }
  }
}
