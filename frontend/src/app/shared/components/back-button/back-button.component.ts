import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BackService } from '../../services/back.service';

@Component({
  selector: 'app-back-button',
  imports: [
    MatButton,
    FaIconComponent
  ],
  template: `
	  <button (click)="goBack()" class="back-button" mat-stroked-button>
		  <div class="gradient-text">
			  <fa-icon [icon]="faArrowLeft"></fa-icon>
			  Go Back
		  </div>
	  </button>
  `,
  styles: [
    `
    .back-button {
      min-width: 128px;

      fa-icon {
        margin-right: 8px;
      }
    }
  `
  ]
})
export class BackButtonComponent {
  // Properties
  returnUrl = input<string>();

  // Icons
  readonly faArrowLeft = faArrowLeft;

  constructor(private backService: BackService) {}

  goBack() {
    this.backService.goBack(this.returnUrl());
  }
}

