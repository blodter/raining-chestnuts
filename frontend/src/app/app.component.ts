import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet
} from '@angular/router';
import { FaIconLibrary, FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faLocationArrow, faSliders } from '@fortawesome/free-solid-svg-icons';
import { SubscriptionHandlerComponent } from './shared/components/subscription-handler/subscription-handler.component';
import { LoadingService } from './shared/services/loading.service';

const farIcons: IconDefinition[] = [
  faClock
];

const fasIcons: IconDefinition[] = [
  faLocationArrow,
  faSliders
];

@Component({
  selector: 'app-root',
  imports: [
    MatToolbar,
    MatButton,
    MatDrawerContainer,
    RouterOutlet,
    MatProgressBar,
    FontAwesomeModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends SubscriptionHandlerComponent {
  // Properties
  loading: boolean = false;

  constructor(
    private iconLibrary: FaIconLibrary,
    private loadingService: LoadingService,
    private router: Router,
  ) {
    super();
    this.iconLibrary.addIcons(...farIcons, ...fasIcons);
    this.loadingService.loading$.dieWith(this).subscribe((loading) => {
      this.loading = loading;
    });

    this.router.events.dieWith(this).subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loadingService.start();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loadingService.reset();
      }
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
