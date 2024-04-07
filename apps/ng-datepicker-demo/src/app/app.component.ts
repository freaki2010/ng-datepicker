import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DatepickerTailwindComponent } from '@yatafu/datepicker';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    DatepickerTailwindComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ng-datepicker';
  date = new Date('2023-07-07')
}
