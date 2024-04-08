import { Component, Input, inject } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgbDropdownModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  router = inject(Router);
  @Input() icon = '';

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
