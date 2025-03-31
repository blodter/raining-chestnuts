import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[click]'
})
export class ClickableDirective {
  // This directive adds a 'clickable' class to the host element
  @HostBinding('class.clickable') clickable = true;
}
