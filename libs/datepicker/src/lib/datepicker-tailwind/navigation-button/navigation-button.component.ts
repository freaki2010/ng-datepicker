import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-yatafu-navigation-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation-button.component.html',
  styleUrl: './navigation-button.component.scss',
})
export class NavigationButtonComponent {
  @Output() increaseClick = new EventEmitter()
  @Output() decreaseClick = new EventEmitter()
}
