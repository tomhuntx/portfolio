import { Component, Input, OnInit, inject } from '@angular/core';
import {
  NgbDropdownConfig,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NavigationItem } from './navigation-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [NgbDropdownConfig],
})
export class DropdownComponent implements OnInit {
  router = inject(Router);
  @Input() icon = '';

  constructor(config: NgbDropdownConfig) {
    config.placement = 'top-start';
    config.autoClose = 'outside';
  }

  public buttons: NavigationItem[] = [
    { name: 'Home', url: '', selected: false },
    { name: 'About Me', url: 'about', selected: true },
    { name: 'My Skills', url: 'skills', selected: true },
  ];

  ngOnInit(): void {
    // On navigate, hide buttons matching the current url
    this.router.events.subscribe(() => {
      this.buttons.forEach((btn) => {
        btn.selected = this.router.url === `/${btn.url}`;
      });
    });
  }

  navigate(url: string): void {
    this.router.navigateByUrl(url);
  }
}
